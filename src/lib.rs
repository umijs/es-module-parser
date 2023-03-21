#![deny(clippy::all)]

mod dynamic_import_visitor;
mod extract_imports;
mod module_utils;
mod types;

use crate::extract_imports::extract_module_imports;
use crate::module_utils::{parse_code_to_module, parse_file_to_module};
use crate::types::DeclareType;
use futures;
use napi::anyhow::anyhow;
use napi::bindgen_prelude::*;
use napi::tokio::{sync::Semaphore, task, task::JoinHandle};
use napi_derive::napi;
use serde_json::Value;
use std::collections::HashMap;
use std::sync::Arc;

#[napi]
fn parse_code(code: String) -> Result<Value> {
  let import_map = extract_from_code(code)?;

  let value =
    serde_json::to_value(&import_map).map_err(|_| anyhow!("serialize import declares error"))?;

  Ok(value)
}

#[napi]
async fn parse_files(files: Vec<String>) -> Result<Value> {
  let file_imports = parse_files_async(files).await?;

  let value =
    serde_json::to_value(&file_imports).map_err(|_| anyhow!("serialize import declares error"))?;

  Ok(value)
}

#[napi]
async fn parse_files_json_str(files: Vec<String>) -> Result<String> {
  let file_imports = parse_files_async(files).await?;

  let json = serde_json::to_string(&file_imports)
    .map_err(|e| anyhow!("Failed to serialize to json: {}", e))?;

  Ok(json)
}

async fn parse_files_async(files: Vec<String>) -> Result<HashMap<String, Vec<DeclareType>>> {
  let mut file_imports: HashMap<String, Vec<DeclareType>> = HashMap::new();

  let semaphore = Arc::new(Semaphore::new(4));
  let mut handles = Vec::new();

  for file in files {
    let sc = semaphore.clone();
    let h: JoinHandle<Result<(String, Vec<DeclareType>)>> = task::spawn(async move {
      let permit = sc
        .acquire()
        .await
        .map_err(|_e| anyhow!("acquire permit error"))?;
      let result = extract_from_file(&file).await?;
      drop(permit);
      Ok((file, result))
    });
    handles.push(h);
  }

  let results = futures::future::join_all(handles).await;

  for result in results {
    match result {
      Ok(res) => match res {
        Ok(x) => {
          file_imports.insert(x.0, x.1);
        }
        Err(e) => {
          return Err(e);
        }
      },
      Err(_) => {
        return Err(anyhow!("Join Error").into());
      }
    };
  }

  Ok(file_imports)
}

fn extract_from_code(code: String) -> Result<Vec<DeclareType>> {
  let mut module = parse_code_to_module(code)?;
  Ok(extract_module_imports(&mut module))
}

async fn extract_from_file(file_name: &String) -> Result<Vec<DeclareType>> {
  let mut module = parse_file_to_module(file_name)?;
  let imports = extract_module_imports(&mut module);
  Ok(imports)
}
