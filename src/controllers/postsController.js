import fs from "fs";
import { getPosts, criarPost, atualizarPost } from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
    const posts = await getPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const dados = req.body;
    try {
        const novoPost = await criarPost(dados);
        res.status(200).json(novoPost);
    } catch(erro) {
        console.error(erro.message);
        // É um problema dar tantos detalhes.
        // Logo, retornamos apenas que deu erro.
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function enviarImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const resposta = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${resposta.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(resposta);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    const dados = req.body;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: dados.alt
        };

        const novoPost = await atualizarPost(id, post);
        res.status(200).json(novoPost);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}