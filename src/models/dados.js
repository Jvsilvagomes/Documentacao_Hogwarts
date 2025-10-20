// const bruxos = [
//     {
//         id: 1,
//         nome: "Harry Potter",
//         casa: "Gryffindor",
//         anoNascimento: 1980,
//         especialidade: "Defesa Contra as Artes das Trevas",
//         nivelMagia: "Avançado",
//         ativo: true
//     },
//     {
//         id: 2,
//         nome: "Hermione Granger",
//         casa: "Gryffindor", 
//         anoNascimento: 1979,
//         especialidade: "Transfiguração",
//         nivelMagia: "Mestre",
//         ativo: true
//     },
//     {
//         id: 3,
//         nome: "Draco Malfoy",
//         casa: "Slytherin",
//         anoNascimento: 1980,
//         especialidade: "Poções",
//         nivelMagia: "Intermediário",
//         ativo: false
//     }
// ];

// export default { bruxos };

// importar o prisma client

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Criar exportando a variável -> findAll(EncontreTodos) que vai ser o SELECT * FROM bruxos;
export const findAll = async () => {
    // SELECT * FROM bruxos;
    return await prisma.bruxo.findMany({
        orderBy: {nome : 'asc'}
    });
};

export const encontreUm = async (id) => {
    // SELECT * FROM bruxos WHERE id = 1;

    return await prisma.bruxo.findUnique({
        where: { id: Number(id) },
    });
};
