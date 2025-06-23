const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

//Configuração do express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'userdb'
});

conexao.connect(function (erro) {
    if (erro) throw erro;
    console.log("Conectado no banco de dados!");
});

app.get('/', function (req, res) {
    let sql = 'select * from usuarios';
    conexao.query(sql, function (erro, retorno) {
        res.render('listagem', { listagem: retorno });
    });
});

app.get('/adicionar', function (req, res) {
    res.render('adicionar');
});

app.post('/adicionar', function (req, res) {
    const { nome, email, senha, nivacesso } = req.body;

    // Verifica se já existe usuário com esse email
    const sqlCheck = 'SELECT * FROM usuarios WHERE email = ?';
    conexao.query(sqlCheck, [email], function (erro, resultados) {
        if (erro) throw erro;

        if (resultados.length > 0) {
            // Usuário já existe
            return res.render('resultado', { mensagem: 'Erro: Usuário com esse email já existe!' });
        }

        // Insere usuário se não existir
        const sqlInsert = 'INSERT INTO usuarios (nome, email, senha, nivacesso) VALUES (?, ?, ?, ?)';
        conexao.query(sqlInsert, [nome, email, senha, nivacesso], function (erro, resultado) {
            if (erro) throw erro;

            res.render('resultado', { mensagem: 'Usuário cadastrado com sucesso!' });
        });
    });
});

app.get('/listar', function (req, res) {
    let sql = 'select * from usuarios';
    conexao.query(sql, function (erro, retorno) {
        res.render('listagem', { listagem: retorno });
    });
});

app.get('/pesquisar', function (req, res) {
    const { q } = req.query;

    if (!q || q.trim() === '') {
        const sql = 'SELECT * FROM usuarios';
        conexao.query(sql, function (erro, retorno) {
            if (erro) throw erro;
            res.render('listagem', { listagem: retorno });
        });
    } else {
        const busca = '%' + q + '%';
        const sql = 'SELECT * FROM usuarios WHERE nome LIKE ? OR email LIKE ?';
        conexao.query(sql, [busca, busca], function (erro, retorno) {
            if (erro) throw erro;
            res.render('listagem', { listagem: retorno });
        });
    }
});

app.get('/trocarsenha/:id', function (req, res) {
    const { id } = req.params;
    res.render('trocarsenha', { id: id });
});

app.post('/trocarsenha/:id', function (req, res) {
    const { id } = req.params;
    const { novaSenha } = req.body;

    const sql = 'UPDATE usuarios SET senha = ? WHERE id = ?';
    conexao.query(sql, [novaSenha, id], function (erro, resultado) {
        if (erro) throw erro;

        res.render('resultado', { mensagem: 'Senha atualizada com sucesso!' });
    });
});

app.get('/excluir/:id', function (req, res) {
    const { id } = req.params;

    const sql = 'DELETE FROM usuarios WHERE id = ?';
    conexao.query(sql, [id], function (erro, resultado) {
        if (erro) throw erro;

        res.render('resultado', { mensagem: 'Usuário excluído com sucesso!' });
    });
});

app.listen(3000);