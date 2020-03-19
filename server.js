const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const session = require("express-session");
const flash = require('connect-flash');


const bodyParser = require("body-parser");

const employeesRoutes = require("./routes/employees");


dotenv.config({ path: "./config.env" });


// Connecting to mongodb database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.use(bodyParser.urlencoded({ extended: true }))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Middleware for method override
app.use(methodOverride('_method'));

// Middleware for express session
app.use(session({
    secret: "Dinho",
    resave: true,
    saveUninitialized: true
}));

// Middleware for connect flash
app.use(flash());

// Setting messages variables globally
app.use((req, res, next) => {
    res.locals.success_msg = req.flash(("success_msg"));
    res.locals.error_msg = req.flash(("error_msg"));
    next();
})

app.use(employeesRoutes)


app.listen("3000", () => {
    console.log("Listen...")
})



// const port = process.env.PORT
// app.listen(port, () => {
//     console.log("Listenning...")
// })