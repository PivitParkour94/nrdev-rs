#[macro_use] extern crate rocket;
extern crate rocket_dyn_templates;

use rocket::Request;
use rocket_dyn_templates::{Template, context};
use rocket::fs::{FileServer, relative};

#[get("/admin")]
fn admin_page() -> &'static str {
    "Admin section todo"
}

#[catch(404)]
fn not_found(req: &Request<'_>) -> Template {
    Template::render("errors/404", context! {
        uri: req.uri()
    })
}

#[catch(500)]
fn internal_error(req: &Request<'_>) -> Template {
    Template::render("errors/500", context! {
        uri: req.uri()
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
    .attach(Template::fairing())
    .mount("/demo", routes![admin_page])
    .mount("/", FileServer::from(relative!("static")))
    .register("/", catchers![not_found,internal_error])
}
