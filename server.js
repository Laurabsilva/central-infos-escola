import express from "express";
const app = express();
const PORT = 3000;

// Sprint 01

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

//Sprint 02 - 

const mensagens = [
    {id: 1, usuario: "Isabela", texto: "Bom dia magnata!"},
    {id: 2, usuario: "Laura", texto: "Oii :)"},
    {id: 3, usuario: "Rafaela", texto: "Tudo bem?!"},
    {id: 4, usuario: "Heloísa", texto: "Como vai?"},
    {id: 4, usuario: "Sophia", texto: "Até logo!!"}
];

function listarMensagens() {
    return mensagens
};

app.get("/", (req, res) => {
    res.send("Servidor rodando🚀");
});

app.get('/status', (req, res) => {
    res.json({ status: 'online', sprint: 2});
})

app.get("/sobre", (req, res) => {
    res.send("Projeto Mensageiro Local");
});
    
app.get('/mensagens', (req, res) => {
    res.json(listarMensagens());
});

app.get('/mensagens:id/', (req, res) => {
        const mensagem = mensagens.find(m.id === Number(req.params.id));
        if(!mensagem)return res.status(404).json({erro: "Não encontrada"});
        res.json(mensagem); 
});

app.get("/total-mensagens", (req, res) => 
    res.json({ total: mensagens.length }));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor em http://localhost:${PORT}`)
});
