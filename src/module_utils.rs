use napi::anyhow::{anyhow, Context};
use napi::bindgen_prelude::*;
use std::path::Path;
use swc_common::errors::{ColorConfig, Handler};
use swc_common::input::StringInput;
use swc_common::sync::Lrc;
use swc_common::{FileName, SourceMap};
use swc_ecma_ast::Module;
use swc_ecma_parser::lexer::Lexer;
use swc_ecma_parser::{Parser, Syntax, TsConfig};

pub fn parse_file_to_module(file_path: &String) -> Result<Module> {
  let cm: Lrc<SourceMap> = Default::default();
  let handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));

  let fm = cm
    .load_file(Path::new(file_path.as_str()))
    .context(format!("Cant load file: {}", file_path))?;

  let lexer = Lexer::new(
    Syntax::Typescript(TsConfig {
      tsx: true,
      decorators: true,
      ..Default::default()
    }),
    Default::default(),
    StringInput::from(&*fm),
    None,
  );

  let mut parser = Parser::new_from(lexer);

  for e in parser.take_errors() {
    e.into_diagnostic(&handler).emit();
  }

  let module = parser.parse_module().map_err(|e| {
    // Unrecoverable fatal error occurred
    e.into_diagnostic(&handler).emit();
    anyhow!("parse module script file failed: {}", file_path)
  })?;

  Ok(module)
}

pub fn parse_code_to_module(code: String) -> Result<Module> {
  let cm: Lrc<SourceMap> = Default::default();
  let handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));

  let fm = cm.new_source_file(FileName::Custom("_.tsx".to_string()), code);
  let lexer = Lexer::new(
    // We want to parse ecmascript
    Syntax::Typescript(TsConfig {
      tsx: true,
      ..Default::default()
    }),
    // EsVersion defaults to es5
    Default::default(),
    StringInput::from(&*fm),
    None,
  );

  let mut parser = Parser::new_from(lexer);

  for e in parser.take_errors() {
    e.into_diagnostic(&handler).emit();
  }

  let m = parser.parse_module().map_err(|e| {
    e.into_diagnostic(&handler).emit();
    anyhow!("parse module script code failed")
  })?;

  Ok(m)
}
