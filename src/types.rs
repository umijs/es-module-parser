use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(tag = "type")]
pub enum SimpleImportSpecifier {
  #[serde(rename = "ImportDefaultSpecifier")]
  DefaultImport(ImportDefaultName),

  #[serde(rename = "ImportSpecifier")]
  NamedImport(NamedImportName),

  #[serde(rename = "ImportNamespaceSpecifier")]
  NamespaceImport(NamespaceName),

  DynamicImport(DynamicName),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(tag = "type")]
pub enum SimpleExportSpecifier {
  #[serde(rename = "ExportDefaultSpecifier")]
  DefaultImport(ExportDefaultName),

  #[serde(rename = "ExportNamespaceSpecifier")]
  NamespaceExport(ExportNamespaceSpecifier),

  #[serde(rename = "ExportSpecifier")]
  NamedExport(NamedExportName),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NamedExportName {
  pub exported: String,
  pub local: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ExportNamespaceSpecifier {
  pub exported: String,
}

// import * as x from 'y'
// export * from 'y'  Option case
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NamespaceName {
  pub local: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DynamicName {}

// import x from 'y'
// export x from 'y'
// export { default } from 'y'
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ImportDefaultName {
  pub local: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ExportDefaultName {
  pub exported: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NamedImportName {
  pub local: String,
  pub imported: String,
}

#[derive(Serialize, Deserialize)]
pub struct ImporteeName {
  #[serde(rename = "type")]
  pub import_type: String,
  pub name: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct Imports {
  pub source: String,
  pub imports: Vec<SimpleImportSpecifier>,
}
