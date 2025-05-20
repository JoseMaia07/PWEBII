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
    res.render('formulario');
});

app.post('/login', function (req, res) {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    conexao.query(sql, [email], function (erro, resultados) {
        if (erro) throw erro;

        if (resultados.length === 0) {
            return res.render('resultado', { mensagem: 'Usuário não encontrado.' });
        }

        const usuario = resultados[0];
        console.log('Senha digitada:', senha);
        console.log('Senha no banco:', usuario.senha);
        console.log('Nível de acesso: ', usuario.nivacesso)

        if (senha !== usuario.senha) {
            return res.render('resultado', { mensagem: 'Senha incorreta.' });
        }

        if (usuario.nivacesso === 1) {
            return res.render('resultado', { mensagem: 'Bem-vindo, administrador!' });
        } else {
            return res.render('resultado', { mensagem: 'Você não tem acesso administrativo.' });
        }
    });
});

app.get('/listar', function (req, res) {
    let sql = 'select * from usuarios';
    conexao.query(sql, function (erro, retorno) {
        res.render('listagem', { listagem: retorno });
    });
});

app.listen(3000);