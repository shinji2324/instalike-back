// Exercício proposto pela Luri

import { conexao } from "./conexao.js";

export async function getUsuarios() {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('usuarios');
    return colecao.find().toArray();
}
