import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./notificacionsDb.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }

};

const writeData = (data) => {
    try {
        fs.writeFileSync("./notificacionsDb.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};


app.get("/", (req, res) => {
    res.send("Welcome to the my first API");
})

app.get("/notificacions", (req, res) => {
    const data = readData();
    res.json(data.notificacions);
});

//Creem un endpoint per obtenir una notificació
app.get("/notificacions/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const notificacions_id = parseInt(req.params.id);
    const notificacions = data.notificacions.find((notificacions) => notificacions.notificacions_id === notificacions_id);
    res.json(notificacions);
});


//Creem un endpoint del tipus post per afegir una notifiacio
app.post("/notificacions", (req, res) => {
    const data = readData();
    const body = req.body;
    //tot el que ve al ...body s'afegeix a la nova notifiacio
    const newNotificacions = {
        ...body
    };
    data.notificacions.push(newNotificacions);
    writeData(data);
    res.json(newNotificacions);
});


//Creem un endpoint per modificar una notifiacio
app.put("/notificacions/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificacionsIndex = data.notificacions.findIndex((notificacions) => notificacions.notificacions_id === id);
    data.notificacions[notificacionsIndex] = {
        ...data.notificacions[notificacionsIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Usuari updated successfully" });
});

    app.delete("/notificacions/:id", (req, res) => {
        const data = readData();
        const id = parseInt(req.params.id);
        const notificacionsIndex = data.notificacions.findIndex((notificacions) => notificacions.notificacions_id === id);
        //splice esborra a partir de notifiacionsIndex, el número de elements
        // que li indiqui al segon argument, en aquest cas 1
        data.notificacions.splice(notificacionsIndex, 1);
        writeData(data);
        res.json({ message: "Reserva deleted successfully" });
        });

///Funcio per escoltar les dades 
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});