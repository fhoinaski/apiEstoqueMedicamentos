const Deposito = require("../models/Deposito");

// Função para verificar se o CNPJ já está cadastrado
async function checkDuplicateCnpj(cnpj) {
    const existingDeposito = await Deposito.findOne({ where: { cnpj } });
    return !!existingDeposito; // Retorna true se já existir um depósito com o mesmo CNPJ, caso contrário, retorna false.
}

// Função para verificar se a Razão Social já está cadastrada
async function checkDuplicateRazaoSocial(razaoSocial) {
    const existingDeposito = await Deposito.findOne({ where: { razaoSocial } });
    return !!existingDeposito; // Retorna true se já existir um depósito com a mesma Razão Social, caso contrário, retorna false.
}

module.exports = {
    checkDuplicateCnpj,
    checkDuplicateRazaoSocial
};