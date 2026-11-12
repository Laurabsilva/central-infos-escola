import express from "express";
const app = express();
const PORT = 3000;

// Sprint 01

app.get("/", (req, res) => {
    res.send("Bem-vindo(a) à central de informações da Escola Mundial!!");
});

app.get('/status', (req, res) => {
    res.json({ status: 'online', sprint: 1, mensagem: 'Servidor está funcionando 🚀' });
})
app.get('/escola', (req, res) => {
    res.json({ nome: 'Escola Mundial', cidade: 'Campinas', tipo: 'Ensino Técnico' })
})

app.get('/cursos', (req, res) => {
    res.json([
        { id: 1, nome: 'Desenvolvimento de Sistemas' },
        { id: 2, nome: 'Nutrição' },
        { id: 3, nome: 'Enfermagem' }
    ]);
});

app.get('/professor', (req, res) => {
    res.json([
        { nome: 'Eduardo', curso: 'Desenvolvimento de Sistemas' },
        { nome: 'Bianca', curso: 'Nutrição' },
        { nome: 'Eduardo', curso: 'Enfermagem' }
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
    { id: 1, usuario: "Isabela", texto: "Bom dia magnata!" },
    { id: 2, usuario: "Laura", texto: "Oii :)" },
    { id: 3, usuario: "Rafaela", texto: "Tudo bem?!" },
    { id: 4, usuario: "Heloísa", texto: "Como vai?" },
    { id: 4, usuario: "Sophia", texto: "Até logo!!" }
];

function listarMensagens() {
    return mensagens
};

app.get("/", (req, res) => {
    res.send("Servidor rodando🚀");
});

app.get('/status', (req, res) => {
    res.json({ status: 'online', sprint: 2 });
})

app.get("/sobre", (req, res) => {
    res.send("Projeto Mensageiro Local");
});

app.get('/mensagens', (req, res) => {
    res.json(listarMensagens());
});

app.get('/mensagens:id/', (req, res) => {
    const mensagem = mensagens.find(m.id === Number(req.params.id));
    if (!mensagem) return res.status(404).json({ erro: "Não encontrada" });
    res.json(mensagem);
});

app.get("/total-mensagens", (req, res) =>
    res.json({ total: mensagens.length }));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor em http://localhost:${PORT}`)
});

// Sprint 03 -

function consultar(simulacaoErro = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (simulacaoErro) return reject(newError("Falha simulada"));
            resolve(mensagens);
        }, 1000);
    });
}

app.get("/mensagens-then", (req, res) => {
    consultar()
        .then((lista) => res.json(lista))
        .catch(() => res.status(500).json({ erro: "Falha na consulta" }));
});

app.get("/mensagens-async", async (req, res) => {
    try {
        res.json(await consultar());
    } catch (erro) {
        res.status(500).json({ erro: "Falha na consulta" });
    }
});

app.get("/mensagens-erro", async (req, res) => {
    try {
        res.json(await consultar(true));
    } catch (erro) {
        res.status(500).json({ erro: "Falha simulada" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor em http://localhost:${PORT}`);
});

// Sprint 04 -

import { lerMensagens, salvarMensagens } from "./store.js";

app.get("/", (req, res) => res.send("Servidor rodando! 🚀"));

app.get("/status", (req, res) => res.json({ status: "online", sprint: 4 }));

app.get("/sobre", (req, res) => res.send("Mensageiro Local com Node.js, Express e ES Modules."));

app.get("/mensagens", async (req, res) => {
  try { res.json(await lerMensagens()); }
  catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Não foi possível ler as mensagens." });
  }
});

app.get("/mensagens/:id", async (req, res) => {
  try {
    const lista = await lerMensagens();
    const mensagem = lista.find(m => m.id === Number(req.params.id));
    if (!mensagem) return res.status(404).json({ erro: "Mensagem não encontrada." });
    res.json(mensagem);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao consultar mensagem."});
  }
});

app.get("/total-mensagens", async (req, res) => {
  try { res.json({ total: (await lerMensagens()).length }); }
  catch (erro) { res.status(500).json({ erro: "Falha na contagem." }); }
});

app.get("/exemplo-salvar", async (req, res) => {
  try {
    throw new Error("Falha planejada na gravação.");
  } catch (erro) {
    console.error("Erro planejado em /exemplo-salvar:", erro.message);
    res.status(500).json({
      erro: "Erro planejado em /exemplo-salvar",
      detalhes: erro.message,
      dica: "Use /gravar-mensagem-correta para gravar uma mensagem."
    });
  }
});

let filaGravacoes = Promise.resolve();
app.get("/gravar-mensagem-correta", (req, res) => {
  const tarefa = filaGravacoes.then(async () => {
    const lista = await lerMensagens();
    const id = lista.reduce((maior, mensagem) => Math.max(maior, Number(mensagem.id) || 0), 0) + 1;
    const mensagem = {
      id,
      usuario: "Exemplo",
      texto: "Gravado em arquivo!"
    };
    await salvarMensagens([...lista, mensagem]);
    return { aviso: "Mensagem gravada com sucesso!", mensagem, total: lista.length + 1 };
  });
  
  filaGravacoes = tarefa.catch(() => {});
  tarefa.then(resultado => res.json(resultado)).catch(erro => {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao gravar arquivo." });
  });
});

