const express = require("express");
const sendMail = require("./mail");
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const path = require("path");
app.use(express.static(path.join("public")));

const contactRouter = require("./routes/contact");


app.use(contactRouter.router)

const fs = require("fs");

const nav = fs.readFileSync(__dirname + "/public/nav/nav.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

const home = fs.readFileSync(__dirname + "/public/home/home.html", "utf-8");
const resume = fs.readFileSync(__dirname + "/public/resume/resume.html", "utf-8");
const skills = fs.readFileSync(__dirname + "/public/skills/skills.html", "utf-8");
const contact = fs.readFileSync(__dirname + "/public/contact/contact.html", "utf-8");



app.get("/", (req, res) => {
    res.send(home);
});

app.get("/resume", (req, res) => {
    res.send(resume);
});

app.get("/skills", (req, res) => {
    res.send(skills);
});

app.get("/contact", (req, res) => {
    res.send(contact);
});

//email
app.post("/email", (req, res) => {

    //send email here
    const { subject, email, text } = req.body;
    console.log("Data: ", req.body);
    
    sendMail(email, subject, text, function(err, data) {
        if (err) {
            res.status(500).json({ message: "Internal Error" });
        } else {
            res.json({ message: "Email sent!!!" });
        }
    });
});













app.listen(8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port", 8080);
})