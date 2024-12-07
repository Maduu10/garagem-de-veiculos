// Importação das bibliotecas
const express = require('express');
const bodyParser = require('body-parser');

// Criação do app Express
const app = express();

// Configurar o body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static('public'));

// Importação das rotas
const veiculoRotas = require('./src/routes/veiculo');

// Definição de parâmetros do servidor
const hostname = '127.0.0.1';
const port = 8080;

// Rota principal (GET)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/pages/index.html');
});

// Usar as rotas para veículos
app.use('/veiculo', veiculoRotas);


app.listen(port, hostname, () => {
  console.log("Servidor rodando em http://127.0.0.1:8080");
});
