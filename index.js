import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import recursosRoutes from "./routes/recursos.js";
import reservesRoutes from "./routes/reserves.js";
import userRoutes from "./routes/usuaris.js";
import notificacionsRoutes from "./routes/notificacions.js";

const SECRET_JWT_KEY = "your-secret-key"; // Cambia esto por una clave segura
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public")); // Carpeta pública para CSS
app.set("view engine", "ejs"); // Usar el motor EJS
app.set("views", "./views"); // Carpeta donde se almacenan los archivos .ejs

// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
    const token = req.cookies?.access_token; // Leer el token de las cookies
    if (!token) {
        return res.status(401).send("Acceso no autorizado");
    }

    jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).send("Token inválido");
        }
        req.user = user; // Guardar los datos del usuario en la solicitud
        next();
    });
}

// Ruta principal
app.get("/", (req, res) => {
    const { user } = req.session;
    res.render("index", user);
});

// Endpoint para login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("llego aqui");
        const user = await UserRepository.login({ username, password });
        console.log("llego aqui 1");
        const token = jwt.sign(
            { id: user._id, username: user.username },
            SECRET_JWT_KEY,
            {
                expiresIn: "1h",
            }
        );
        console.log("llego aqui 2");
        res
            .cookie("access_token", token, {
                httpOnly: true, // La cookie solo se puede acceder en el servidor
                secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
                sameSite: "strict", // La cookie solo es accesible dentro del dominio
                maxAge: 1000 * 60 * 60, // La cookie tiene una validez de una hora
            })
            .send({ user, token });
    } catch (error) {
        res.status(401).send(error.message); // 401 = No autorizado
    }
});

// Endpoint para registro
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        const id = await UserRepository.create({ username, password });
        res.send({ id });
    } catch (error) {
        res.status(400).send(error.message); // No es buena idea enviar el error del repositorio
    }
});

// Endpoint para logout
app.post("/logout", (req, res) => {
    res.clearCookie("access_token").json({ message: "logout successful" });
});

// Ruta protegida de ejemplo
app.get("/protected", authenticateToken, (req, res) => {
    res.send(`Bienvenido, ${req.user.username}`);
});

// Proteger rutas específicas
app.use("/recursos", authenticateToken, recursosRoutes);
app.use("/reserves", authenticateToken, reservesRoutes);
app.use("/usuaris", authenticateToken, userRoutes);
app.use("/notificacions", authenticateToken, notificacionsRoutes);

// Ruta protegida para home
app.get("/home", authenticateToken, (req, res) => {
    res.render("home", { username: req.user.username });
});

// Iniciar el servidor
app.listen(3003, () => {
    console.log("Servidor corriendo en el puerto 5000");
});