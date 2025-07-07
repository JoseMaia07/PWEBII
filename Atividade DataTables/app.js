const express = require('express');
const app = express();
const port = 3000;

const dados = [
    { id: 1, disciplina: 'Matemática VI', professor: 'Francisco Regis', periodo: 'P6' },
    { id: 2, disciplina: 'Física Ondulatória', professor: 'José Carlos', periodo: 'P6' },
    { id: 3, disciplina: 'Higiene e Segurança do Trabalho', professor: 'Olívio Britto', periodo: 'P6' },
    { id: 4, disciplina: 'Empreendedorismo', professor: 'Carlos Alexandre', periodo: 'P6' },
    { id: 5, disciplina: 'Sociologia', professor: 'João Paulo', periodo: 'P6' },
    { id: 6, disciplina: 'Gestão Empresarial', professor: 'Sarah Mesquita', periodo: 'P6' },
    { id: 7, disciplina: 'Introdução a Segurança Cibernética', professor: 'Maurício Jaborandy', periodo: 'P6' },
    { id: 8, disciplina: 'Programação Web II', professor: 'Maurício Jaborandy', periodo: 'P6' },
    { id: 9, disciplina: 'Práticas Profissionais III', professor: 'Maurício Jaborandy', periodo: 'P6' },
    { id: 10, disciplina: 'Língua Portuguesa VI', professor: 'Eugênia Tavares', periodo: 'P6' },
    { id: 11, disciplina: 'Língua Portuguesa V', professor: 'Eugênia Tavares', periodo: 'P5' },
    { id: 12, disciplina: 'Filosofia', professor: 'Jeriel Silva', periodo: 'P5' },
    { id: 13, disciplina: 'Eletrônica para Informática', professor: 'Carlos Wagner', periodo: 'P5' },
    { id: 14, disciplina: 'Matemática V', professor: 'Francisco Gêvane', periodo: 'P5' },
    { id: 15, disciplina: 'Programação Web I', professor: 'José Roberto', periodo: 'P5' },
    { id: 16, disciplina: 'Práticas Profissionais II', professor: 'José Roberto', periodo: 'P5' },
    { id: 17, disciplina: 'Química III', professor: 'Marcos Vinício Pitombeira', periodo: 'P5' },
    { id: 18, disciplina: 'Programação de Dispositivos Móveis II', professor: 'Ricardo Duarte Taveira', periodo: 'P5' }
];

app.use(express.static('public'));

app.get('/api/dados', (req, res) => {
    res.json({ data: dados });

});

app.listen(port, () => {
    console.log(`Servidor rodando... Sem explodir`);
});
