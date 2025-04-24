import express from "express";
import fs from "fs";

const router = express.Router();

const readUsuaris = () => {
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

router.get("/", (req, res) => {
    const user={name:"Anmol i Denis"}
    const htmlMessage = `
    <a href="/">Volver a Home</a>`;
    const data = readUsuaris();
    res.render("usuaris",{user, data, htmlMessage});
    //res.json(data.recursos);
});

router.get("/:id", (req, res) => {
    const data = readUsuaris();
    const user={name:"Anmol i Denis"}
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const usuari_id = parseInt(req.params.id);
    const usuari = data.usuari.find((usuari) => usuari.usuari_id === usuari_id);
    res.render("usuariDetall", {user, usuari});
});

router.get("/editarUsuaris/:id", (req, res) => {
    const data = readUsuaris();
    const user={name:"Anmol i Denis"}
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const usuari_id = parseInt(req.params.id);
    const usuari = data.usuari.find((usuari) => usuari.usuari_id === usuari_id);
    res.render("editarUsuaris", {user, usuari});
});

export default router;