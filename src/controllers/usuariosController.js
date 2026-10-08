// Exercício proposto pela Luri
import { getUsuarios } from "../models/usuarioModel.js";

export async function listarUsuarios(req, res) {
    const usuarios = await getUsuarios();
    res.status(200).json(usuarios);
}
