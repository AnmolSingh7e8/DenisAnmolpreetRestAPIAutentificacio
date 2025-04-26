import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import recursosRoutes from "./routes/recursos.js";
import reservesRoutes from "./routes/reserves.js";
import userRoutes from "./routes/usuaris.js";
import notificacionsRoutes from "./routes/notificacions.js";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); //carpeta publica pel css
app.set('view engine','ejs'); //Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

app.get("/", (req, res) => {
    res.render("home");
})

app.use('/recursos', recursosRoutes);
app.use('/reserves', reservesRoutes); 
app.use('/usuaris', userRoutes);
app.use('/notificacions', notificacionsRoutes);


app.listen(5001, () => {
    console.log('Servidor corriendo en el puerto 5001');
  });

