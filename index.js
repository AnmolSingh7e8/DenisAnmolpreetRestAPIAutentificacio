import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); //carpeta publica pel css
app.set('view engine','ejs'); //Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

const readRecursos = () => {
    try {
        const data = fs.readFileSync("./recursosDb.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const readReserves = () => {
    try {
        const data = fs.readFileSync("./reservesDb.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }

};

const writeData = (data) => {
    try {
        fs.writeFileSync("./recursosDb.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/recursos", (req, res) => {
    const user={name:"Anmol i Denis"}
    const htmlMessage = `como pilla`;
    const data = readRecursos();
    res.render("recursos",{user, data, htmlMessage})
    //res.json(data.recursos);
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
