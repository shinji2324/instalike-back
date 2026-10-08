import { ObjectId } from "mongodb";
import { conexao } from "./conexao.js";

async function carregarColecao() {
    const db = conexao.db('imersao-instabytes');
    return db.collection('posts');
}

export async function getPosts() {
    const colecao = await carregarColecao();
    return colecao.find().toArray();
}

export async function criarPost(dados) {
    const colecao = await carregarColecao();
    return colecao.insertOne(dados);
}

export async function atualizarPost(id, dados) {
    const colecao = await carregarColecao();
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:dados});
}
