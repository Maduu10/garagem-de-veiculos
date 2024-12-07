//Alunas Maria Eduarda e Ana Julia


// Importação da biblioteca Express
const express = require('express');

// Função para manipulação de rotas
const rotas = express.Router();

// Lista de veículos (simulando um banco de dados)
let veiculos = [
  { id: 1, nome: 'Civic', fabricante: 'Honda', ano: 2020, combustivel: 'Gasolina', cor: 'Preto', preco: 95000 },
  { id: 2, nome: 'Fusca', fabricante: 'Volkswagen', ano: 1969, combustivel: 'Álcool', cor: 'Amarelo', preco: 25000 },
  { id: 3, nome: 'Corolla', fabricante: 'Toyota', ano: 2022, combustivel: 'Gasolina', cor: 'Branco', preco: 120000 },
  { id: 4, nome: 'Gol', fabricante: 'Volkswagen', ano: 2018, combustivel: 'Gasolina', cor: 'Azul', preco: 35000 },
  { id: 5, nome: 'Fusion', fabricante: 'Ford', ano: 2019, combustivel: 'Flex', cor: 'Prata', preco: 85000 }
];

// Rota GET - Exibe a listagem de veículos (Página HTML)
rotas.get("/", (req, res) => {
  res.status(200).json(veiculos);
});

// Rota POST - Cadastrar um novo veículo
rotas.post("/", (req, res) => {
  const novoVeiculo = {
    id: veiculos.length + 1,
    nome: req.body.nome,
    fabricante: req.body.fabricante,
    ano: req.body.ano,
    combustivel: req.body.combustivel,
    cor: req.body.cor,
    preco: req.body.preco
  };
  
  veiculos.push(novoVeiculo);
  
  res.status(201).json({
    mensagem: 'Veículo cadastrado com sucesso.',
    dadosNovoVeiculo: novoVeiculo
  });
});

// Rota PUT - Atualizar o preço de um veículo
rotas.put("/", (req, res) => {
  const { id, preco } = req.body;
  let veiculoEncontrado = veiculos.find(v => v.id === id);
  
  if (veiculoEncontrado) {
    veiculoEncontrado.preco = preco;
    res.status(200).json({
      mensagem: `Preço do veículo de ID ${id} atualizado com sucesso.`,
      veiculoAtualizado: veiculoEncontrado
    });
  } else {
    res.status(404).json({
      mensagem: `Veículo com ID ${id} não encontrado.`
    });
  }
});

// Rota DELETE - Excluir um veículo
rotas.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const veiculoIndex = veiculos.findIndex(v => v.id === id);
  
  if (veiculoIndex !== -1) {
    veiculos.splice(veiculoIndex, 1);
    res.status(202).json({
      mensagem: `Veículo de ID ${id} excluído com sucesso.`
    });
  } else {
    res.status(404).json({
      mensagem: `Veículo com ID ${id} não encontrado.`
    });
  }
});

module.exports = rotas;
