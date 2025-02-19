import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./usuariDb.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }

};

const writeData = (data) => {
    try {
        fs.writeFileSync("./usuariDb.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};


app.get("/", (req, res) => {
    res.send("Welcome to the my first API");
})

app.get("/usuari", (req, res) => {
    const data = readData();
    res.json(data.usuari);
});

//Creem un endpoint per obtenir un llibre per id
app.get("/usuaris/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const user = data.usuari.find((usuari) => usuari.id === id);
    res.json(usuari);
});


//Creem un endpoint del tipus post per afegir un llibre
app.post("/usuari", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newBook = {
        id: data.usuari.length + 1,
        ...body,
    };
    data.books.push(newUser);
    writeData(data);
    res.json(newUser);
});


//Creem un endpoint per modificar un llibre
app.put("/usuari/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const usuariIndex = data.usuari.findIndex((usuari) => usuari.id === id);
    data.usuaris[usuariIndex] = {
        ...data.usuari[usuariIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Usuari updated successfully" });
});


//Creem un endpoint per eliminar un llibre
app.delete("/usuari/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const usuariIndex = data.usuari.findIndex((usuari) => usuari.id === id);
    //splice esborra a partir de bookIndex, el número de elements
    // que li indiqui al segon argument, en aquest cas 1
    data.usuaris.splice(usuariIndex, 1);
    writeData(data);
    res.json({ message: "Usuari deleted successfully" });
    });

///Funcio per escoltar les dades 
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});