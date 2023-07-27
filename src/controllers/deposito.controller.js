const Deposito = require("../models/Deposito");
const User = require("../models/User");
const { checkUserDeposito } = require("../services/checkDeposito");
const { checkDuplicateCnpj, checkDuplicateRazaoSocial } = require("../services/checkDuplicate");


class DepositoController {
    async createDeposito(req, res) {
        //id do usuário logado
        const userIdToken = req.userId;
        const {  
            userId,           
            razaoSocial,
            cnpj,
            nomeFantasia,
            email,
            telefone,
            celular,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            status,
            latitude, 
            longitude
        } = req.body;
    
        try {
           
            if (userId) {
                if (userId !== userIdToken) {
                    return res.status(401).json({
                        code: "NOK",
                        error: "Não autorizado para cadastrado depósito para outro usuário",
                    });
                }
            }
            // Verifica campos obrigatórios
            const envioObrigatorio = ['razaoSocial', 'cnpj', 'nomeFantasia', 'email', 'celular', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'uf'];
    
            if (!envioObrigatorio.every(field => req.body[field])) {
                const missingFields = envioObrigatorio.filter(field => !req.body[field]);
                return res.status(400).json({
                    code: "NOK",
                    error: "Dados inválidos",
                    msg: `Campos obrigatórios não informados: ${missingFields.join(", ")}`,
                });
            }
    
            // Verifica se o usuário existe
            const user = await User.findOne({ where: { userId:userIdToken } });
            if (!user) {
                return res.status(404).json({
                    code: "NOK",
                    error: "Usuário não encontrado",
                });
            }
    
            // Verifica se CNPJ ou Razão Social já estão cadastrados
            const jaExisteCnpj = await checkDuplicateCnpj(cnpj);
            if (jaExisteCnpj) {
                return res.status(409).json({
                    code: "NOK",
                    error: "CNPJ já cadastrado",
                });
            }
    
            const jaExisteRazaoSocial = await checkDuplicateRazaoSocial(razaoSocial);
            if (jaExisteRazaoSocial) {
                return res.status(409).json({
                    code: "NOK",
                    error: "Razão Social já cadastrada",
                });
            }
    
            // Cria o depósito
            const deposito = await Deposito.create({
                userId: userIdToken,
                razaoSocial,
                cnpj,
                nomeFantasia,
                email,
                telefone,
                celular,
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                uf,
                status,
                latitude,
                longitude
            });
    
            res.status(201).json({
                code: "OK",
                msg: "Depósito criado com sucesso",
                deposito
            });
        } catch (error) {
            console.error("Erro ao criar depósito:", error);
            res.status(500).json({ error: "Erro ao criar depósito" });
        }
    }
    async updateDeposito(req, res) {
        const userId = req.userId;
        const depositoId = req.params.id;
        const checkDeposito = await checkUserDeposito(depositoId);
        
        if (!checkDeposito) {
            return res.status(404).json({
                code: "NOK",
                error: "Depósito não encontrado",
            });
        }
        
        if (userId !== checkDeposito.userId) {
            return res.status(401).json({
                code: "NOK",
                error: "Não autorizado",
            });
        }


        
    }
}

module.exports = new DepositoController();  
