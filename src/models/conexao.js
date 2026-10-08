import conectarAoBanco from "../config/dbConfig.js";

export const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
