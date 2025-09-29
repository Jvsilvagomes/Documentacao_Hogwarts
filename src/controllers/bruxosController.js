import dados from "../models/dados.js";

const { bruxos } = dados;
let resultado = bruxos;

const getAllBruxos = (req,res) => {
    res.status(200).json({
        total: resultado.length,
        bruxos: resultado
    })
}

export { getAllBruxos };