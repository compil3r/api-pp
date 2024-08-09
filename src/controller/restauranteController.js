const connection = require('../config/db')
const dotenv = require('dotenv').config();

const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '..', 'uploads');

if(!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storeRestaurante(request, response) {

    if(!request.files) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const imagem = request.files.imagem;
    const imagemNome = Date.now() + path.extname(imagem.name);

    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        if(erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            })
        }

        const params = Array(
            request.body.nome,
            request.body.endereco,
            imagemNome,
            request.body.telefone
        )
    
        const query = "INSERT INTO restaurantes(nome, endereco, imagem, telefone) VALUES(?, ?, ?, ?)";

        connection.query(query, params, (err, results) => {
            if(results) {
                response.status(200).json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                })
            } else {
                response.status(400).json({
                    success: false,
                    message: "Erro!",
                    sql: err,
                })
            }
        })

    });
   
}

async function getRestaurantes(request, response) {
    const query = "SELECT * FROM restaurantes order by id desc";

    connection.query(query, (err, results) => {
        if(results) {
            response.status(200).json({
                success: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err
            })
        }
    })
}

module.exports = {
    storeRestaurante,
    getRestaurantes
};