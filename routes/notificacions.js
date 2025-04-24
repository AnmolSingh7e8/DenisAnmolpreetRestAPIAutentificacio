import express from "express";
import fs, { read } from "fs";

const router = express.Router();

const readNoti = () => {
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

router.get("/", (req, res) => {
    const user={name:"Anmol i Denis"}
    const htmlMessage = `
    <a href="/">Volver a Home</a>`;
    const data = readNoti();
    res.render("notificacions",{user, data, htmlMessage});
    //res.json(data.recursos);
});

router.get("/:id", (req, res) => {
    const data = readNoti();
    const user={name:"Anmol i Denis"}
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const notificacio = data.notificacions.find((notificacions) => notificacions.notificacions_id === id);
    res.render("notificacionsDetall", {notificacio, user});
});

router.get("/editarNotificacions/:id", (req, res) => {
    const data = readNoti();
    const user={name:"Anmol i Denis"}
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const notificacio = data.notificacions.find((notificacions) => notificacions.notificacions_id === id);
    res.render("editarNotificacions", {notificacio, user});
});

export default router;
