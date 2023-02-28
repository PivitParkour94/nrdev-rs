#[macro_use] extern crate rocket;
extern crate rocket_dyn_templates;

use rocket::Request;
use rocket_dyn_templates::{Template, context};
use rocket::fs::{FileServer, relative};



// @link https://github.com/SergioBenitez/Rocket/tree/v0.5-rc/examples

#[get("/demo/hbs")]
fn hbs_page() -> Template {
    Template::render("hbs/base", context! { 
        title: "Home",
        name: "Human",
        adjective: "cool",
        first_name: "Nate",
        last_name: "Dev"
    })
}


// #[get("/nrdev")]
// fn nrdev_page() -> Template {
    // Template::render("hbs/nrdev", context! {})
// }

#[get("/demo/tera")]
fn tera_page() -> Template {
    Template::render("tera/base", context! { 
        title: "Home",
        name: "Human",
        adjective: "cool",
        first_name: "Nate",
        last_name: "Dev"
    })
}

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
