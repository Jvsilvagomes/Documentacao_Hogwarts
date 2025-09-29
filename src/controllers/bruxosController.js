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

export { getAllBruxos, getBruxosById };
