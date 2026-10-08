import express from "express";
import { listarPosts, postarNovoPost, enviarImagem, atualizarNovoPost } from "../controllers/postsController.js";
import { listarUsuarios } from "../controllers/usuariosController.js";
import multer from "multer";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

// Trecho de código necessário para o multer no Windows
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({dest: "./uploads",  storage});

export const routes = (app) => {
    // Informa à aplicação para converter as estruturas em JSON.
    app.use(express.json());

    // Avisa ao backend que vai chegar requisições desse lugar.
    app.use(cors(corsOptions));


    // Rota para buscar todos os posts.
    app.get("/posts", listarPosts);

    // Rota para criar novo post
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagens (assumindo uma única imagem)
    app.post("/upload", upload.single("imagem"), enviarImagem);

    app.put("/upload/:id", atualizarNovoPost)

    // Exercício proposto pela Luri
    app.get("/usuarios", listarUsuarios);
}
