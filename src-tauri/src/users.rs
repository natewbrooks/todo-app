#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate serde;

use rocket::serde::json::Json;
use mongodb::Client;
use std::sync::Mutex;

#[derive(Deserialize)]
struct UserInput {
    username: String,
    password: String,
    use_category_colors: bool,
    default_schedule_view: String,
}

#[post("/create_user", format = "json", data = "<user_input>")]
async fn create_user_endpoint(client: &rocket::State<Mutex<Client>>, user_input: Json<UserInput>) -> Result<&'static str, rocket::http::Status> {
    let new_user = NewUser {
        username: user_input.username.clone(),
        password: user_input.password.clone(),
        use_category_colors: user_input.use_category_colors,
        default_schedule_view: user_input.default_schedule_view.clone(),
    };
    match create_user(&client.lock().await, new_user).await {
        Ok(_) => Ok("User created successfully"),
        Err(_) => Err(rocket::http::Status::InternalServerError),
    }
}

#[derive(Deserialize)]
struct LoginInput {
    username: String,
    password: String,
}

#[post("/login", format = "json", data = "<login_input>")]
async fn login_endpoint(client: &rocket::State<Mutex<Client>>, login_input: Json<LoginInput>) -> Result<&'static str, rocket::http::Status> {
    let user_input = login_input.into_inner();
    let users_collection = client.lock().await.database("TaskManagement").collection("Users");

    let filter = doc! {
        "username": &user_input.username,
        "password": &user_input.password,  // Note: Storing passwords in plain text is not secure. Consider using hashed passwords.
    };

    match users_collection.find_one(filter, None).await {
        Ok(Some(_)) => Ok("success"),
        Ok(None) => Err(rocket::http::Status::Unauthorized),
        Err(_) => Err(rocket::http::Status::InternalServerError),
    }
}

#[launch]
fn rocket() -> _ {
    let client = Client::with_uri_str("mongodb://localhost:27017").expect("Failed to initialize client.");
    rocket::build()
        .manage(Mutex::new(client))
        .mount("/", routes![create_user_endpoint])

    rocket::build()
        .manage(Mutex::new(client))
        .mount("/", routes![create_user_endpoint, login_endpoint])
}
