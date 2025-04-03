import express from "express";
import fs from "fs";

const router = express.Router();

const readRecursos = () => {
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

router.get("/", (req, res) => {
    const user={name:"Anmol i Denis"}
    const htmlMessage = `
    <a href="/">Volver a Home</a>`;
    const data = readRecursos();
    res.render("recursos",{user, data, htmlMessage});
    //res.json(data.recursos);
});

router.get("/:id", (req, res) => {
    const data = readRecursos();
    const user={name:"Anmol i Denis"}
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const recursos_id = parseInt(req.params.id);
    const recursos = data.recursos.find((recursos) => recursos.recursos_id === recursos_id);
    res.render("recursosDetall", {recursos, user});
});

export default router;
