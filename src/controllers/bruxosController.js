// import dados from "../models/dados.js";

// const { bruxos } = dados;
// let resultado = bruxos;

// const getAllBruxos = (req, res) => {
//   res.status(200).json({
//     total: resultado.length,
//     bruxos: resultado,
//   });
// };

// const getBruxosById = (req, res) => {
//   const id = parseInt(req.params.id);

//   const bruxo = bruxos.find((b) => b.id === parseInt(id));

//   if (!bruxo) {
//     res.status(404).json({
//       status: 404,
//       success: false,
//       message: "Bruxo not found in Hogwarts registry",
//       error: "BRUXO_NOT_FOUND",
//       suggestions: [
//         "Check the wizard name spelling",
//         "Verify if the wizard is registered",
//       ],
//     });
//   }

//   res.status(200).json({
//     status: 200,
//     success: true,
//     total: bruxo.length,
//     bruxo: bruxo,
//   });
// };

// const createBruxo = (req, res) => {
//   const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } =
//     req.body;

//   if (!nome || !casa) {
//     return res.status(400).json({
//       status: 400,
//       success: false,
//       message: "Nome e casa são obrigatórios",
//       error: "OBRIGATORY_ELEMENTS",
//       suggestions: ["Check the wizard nome", "Check the wizard casa"],
//     });
//   }

//   const nomeExiste = bruxos.some(
//     (b) => b.nome.toLowerCase() === nome.toLowerCase()
//   );

//   if (nomeExiste) {
//     return res.status(409).json({
//       status: 409,
//       success: false,
//       message: "Já existe um bruxo com esse nome!",
//       error: "NAME_ALREADY_USED",
//       suggestions: ["Check the wizard nome"],
//     });
//   }

//   const novoBruxo = {
//     id: bruxos.length + 1,
//     nome,
//     casa,
//     anoNascimento: parseInt(anoNascimento),
//     especialidade,
//     nivelMagia: nivelMagia,
//     ativo,
//   };

//   bruxos.push(novoBruxo);

//   res.status(201).json({
//     status: 201,
//     sucess: true,
//     message: "Bruxo cadastrado com sucesso!",
//     bruxo: novoBruxo,
//     total: novoBruxo.length,
//   });
// };

// const deleteBruxo = (req, res) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id)) {
//     return res.status(400).json({
//       status: 400,
//       success: false,
//       message: "ID inválido. O ID deve ser um número.",
//       error: "INVALID_ID",
//       details: "O ID fornecido não é um número válido.",
//     });
//   }

//   const bruxosParaRemover = bruxos.filter((b) => b.id === id);

//   if (!bruxosParaRemover.length) {
//     return res.status(404).json({
//       status: 404,
//       success: false,
//       message: "Bruxo não REGISTRADO!",
//       error: "BRUXO_NOT_FOUND",
//       suggestions: [
//         "Verifique a grafia do nome do bruxo",
//         "Verifique se o bruxo está registrado",
//       ],
//     });
//   }

//   const bruxosFiltrados = bruxos.filter((b) => b.id !== id);

//   bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

//   res.status(200).json({
//     status: 200,
//     success: true,
//     message: `Bruxo ${id} removido com sucesso!!`,
//     bruxo: bruxosParaRemover,
//     total: bruxosParaRemover.length,
//   });
// };

// const updateBruxo = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } =
//     req.body;

//   const idParaEditar = id;

//   if (isNaN(idParaEditar)) {
//     return res.status(400).json({
//       status: 400,
//       success: false,
//       message: "ID inválido. O ID deve ser um número.",
//       error: "INVALID_ID",
//       details: "O ID fornecido não é um número válido.",
//     });
//   }

//   const bruxoExiste = bruxos.find((b) => b.id === idParaEditar);
//   if (!bruxoExiste) {
//     return res.status(404).json({
//       status: 404,
//       success: false,
//       message: "Bruxo não REGISTRADO!",
//       error: "BRUXO_NOT_FOUND",
//       suggestions: [
//         "Verifique a grafia do nome do bruxo",
//         "Verifique se o bruxo está registrado",
//       ],
//     });
//   }

//   const bruxosAtualizados = bruxos.map((bruxo) => bruxo.id === idParaEditar ? {
//           ...bruxo,
//           ...(  nome && { nome } ),
//           ...( casa && { casa } ),
//           ...(anoNascimento && { anoNascimento: parseInt(anoNascimento) } ),
//           ...(especialidade && { especialidade }),
//           ...(nivelMagia && { nivelMagia }),
//           ...(ativo && { ativo }),
//         }
//       : bruxo
//   );

//   bruxos.splice(0, bruxos.length, ...bruxosAtualizados);

//   res.status(200).json({
//     status: 200,
//     success: true,
//     message: `Bruxo ${idParaEditar} atualizado com sucesso!!`,
//     bruxo: bruxosAtualizados.find((b) => b.id === idParaEditar),
//   });
// };

// // integração com o banco de dados

// export { getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxo  };

// logica (filtros), tratativa de erros, e regras de negócio

import { parse } from "dotenv";
import * as Bruxos from "./../models/dados.js";

export const listarTodos = async (req, res) => {
  try {
    const bruxos = await dados.encontreTodos();

    if (!bruxos || bruxos.length === 0) {
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

    res.status(200).json({
      status: 200,
      success: true,
      message: "Bruxos encontrados com sucesso!",
      bruxos: bruxos,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Erro ao buscar os bruxos!",
      error: "BRUXO_NOT_FOUND",
      suggestions: [
        "Verifique a grafia do nome do bruxo",
        "Verifique se o bruxo está registrado",
      ],
    });
  }
};

export const listarUm = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const bruxo = await dados.encontreUm(id);

    if (!bruxo) {
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

    res.status(200).json({
      status: 200,
      success: true,
      message: "Bruxo encontrado com sucesso!",
      bruxo: bruxo,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Erro ao buscar o bruxo!",
      error: "BRUXO_NOT_FOUND",
      suggestions: [
        "Verifique a grafia do nome do bruxo",
        "Verifique se o bruxo está registrado",
      ],
    });
  }
};
    