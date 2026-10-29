import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Bem-vindo(a) à central de informações da Escola Mundial!!");
});

app.get('/status', (req, res) => {
    res.json({ status: 'online', sprint: 1, mensagem: 'Servidor está funcionando 🚀'});
})
app.get('/escola', (req, res) => {
    res.json({nome: 'Escola Mundial', cidade:'Campinas', tipo:'Ensino Técnico'})
})

app.get('/cursos', (req, res) => {
    res.json([
        {id: 1, nome: 'Desenvolvimento de Sistemas'},
        {id: 2, nome: 'Nutrição'},
        {id: 3, nome: 'Enfermagem'}
    ]);
});

app.get('/professor', (req, res) => {
    res.json([
        {nome: 'Eduardo', curso: 'Desenvolvimento de Sistemas'},
        {nome: 'Bianca', curso: 'Nutrição'},
        {nome: 'Eduardo', curso: 'Enfermagem'}
    ]);
});

app.get('/ajuda', (req, res) => {
    res.send([
                'As rotas que estão disponíveis nesse servidor são: ',
                '1- Status',
                '2- Informações da escola',
                '3- Cursos',
                '4- Docentes',
                '5- Guia'
    ]);
});


app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`);
});