import dados from "../models/dados.js";

const { bruxos } = dados;
let resultado = bruxos;

const getAllBruxos = (req, res) => {
  res.status(200).json({
    total: resultado.length,
    bruxos: resultado,
  });
};

const getBruxosById = (req, res) => {
  const id = parseInt(req.params.id);

  const bruxo = bruxos.find((b) => b.id === parseInt(id));

  if (!bruxo) {
    res.status(404).json({
      status: 404,
      success: false,
      message: "Bruxo not found in Hogwarts registry",
      error: "BRUXO_NOT_FOUND",
      suggestions: [
        "Check the wizard name spelling",
        "Verify if the wizard is registered",
      ],
    });
  }

  res.status(200).json({
    status: 200,
    success: true,
    total: bruxo.length,
    bruxo: bruxo,
  });
};

const createBruxo = (req, res) => {
  const { nome, casa, anoNascimento, especialidade, nivelmagia, ativo } =
    req.body;

  if (!nome || !casa) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Nome e casa são obrigatório para um bruxo!",
      error: "VALIDATION_ERROR",
      details: {
        nome: "Invalid name selection",
        house: "Invalid house selection",
      },
    });
  }

  const novoBruxo = {
    id: bruxos.length + 1,
    nome,
    casa,
    anoNascimento: parseInt(anoNascimento),
    especialidade,
    nivelmagia,
    ativo,
  };

  bruxos.push(novoBruxo);

  res.status(201).json({
    status: 200,
    success: true,
    message: "Bruxo criado com sucesso",
    bruxo: novoBruxo,
    total: novoBruxo.length,
  });
};

const deleteBruxo = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "ID inválido. O ID deve ser um número.",
      error: "INVALID_ID",
      details: "O ID fornecido não é um número válido.",
    });
  }

  const bruxosParaRemover = bruxos.filter((b) => b.id === id);

  if (!bruxosParaRemover.length) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Bruxo não REGISTRADO!",
      error: "BRUXO_NOT_FOUND",
      suggestions: [
        "Verifique a grafia do nome do bruxo",
        "Verifique se o bruxo está registrado",
      ],
    });
  }

  const bruxosFiltrados = bruxos.filter((b) => b.id !== id);

  bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

  res.status(200).json({
    status: 200,
    success: true,
    message: `Bruxo ${id} removido com sucesso!!`,
    bruxo: bruxosParaRemover,
    total: bruxosParaRemover.length,
  });

};

export { getAllBruxos, getBruxosById, createBruxo, deleteBruxo };
