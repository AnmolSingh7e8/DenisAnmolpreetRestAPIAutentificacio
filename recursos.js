import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./recursosDb.json");
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
    res.send("Welcome to the my first API");
})

app.get("/recursos", (req, res) => {
    const data = readData();
    res.json(data.recursos);
});

//Creem un endpoint per obtenir un recurs per id
app.get("/recursos/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const recursos_id = parseInt(req.params.id);
    const recursos = data.recursos.find((recursos) => recursos.recursos_id === recursos_id);
    res.json(recursos);
});


//Creem un endpoint del tipus post per afegir un recurs
app.post("/recursos", (req, res) => {
    const data = readData();
    const body = req.body;
    //tot el que ve al ...body s'fegeix al nou recurs
    const newRecurso = {
        ...body
    };
    data.recursos.push(newRecurso);
    writeData(data);
    res.json(newRecurso);
});


//Creem un endpoint per modificar un recurs
app.put("/recursos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursosIndex = data.recursos.findIndex((recursos) => recursos.recursos_id === id);
    data.recursos[recursosIndex] = {
        ...data.recursos[recursosIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Recurso updated successfully" });
});


//Creem un endpoint per eliminar un recurs
app.delete("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recursosIndex = data.recursos.findIndex((recursos) => recursos.id === id);
    //splice esborra a partir de recursosIndex, el número de elements
    // que li indiqui al segon argument, en aquest cas 1
    data.recursos.splice(recursosIndex, 1);
    writeData(data);
    res.json({ message: "Recurso deleted successfully" });
    });

///Funcio per escoltar les dades 
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
