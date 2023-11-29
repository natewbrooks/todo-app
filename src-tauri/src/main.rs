// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use mongodb::{Client, options::ClientOptions};
use std::error::Error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
  // // Initialize MongoDB connection
  // let client_options = ClientOptions::parse(
  //   "mongodb+srv://nwbrooks:Thelastskoorb06@todocluster.y0pts0z.mongodb.net/"
  // )
  // .await?;

  // // Connect to MongoDB Cluster
  // let client = Client::with_options(client_options)?;
  // let database = client.database("TaskManagement");
  
  // // List databases
  // for db_name in client.list_database_names(None, None).await? {
  //   println!("Found database: {}", db_name);
  // }

  // for collection in database.list_collection_names(None).await? {
  //   println!("Found collection: {}", collection);
  // }

  // Initialize and run the Tauri application
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

  Ok(())
}
