const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

// Inicializa o Firebase Admin SDK
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Configura o app Express
const app = express();
app.use(cors()); // Permite comunicação entre origens diferentes (CORS)
app.use(bodyParser.json()); // Parseia JSON no corpo das requisições

// Rota para salvar login e senha no Firestore
app.post("/api/salvar", async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ message: "Login e senha são obrigatórios." });
  }

  try {
    // Salvar no Firestore
    const docRef = await db.collection("usuarios").add({ login, senha });
    res.status(200).json({
      message: "Dados salvos com sucesso!",
      id: docRef.id, // ID do documento salvo
    });
  } catch (error) {
    console.error("Erro ao salvar no Firestore:", error);
    res.status(500).json({ message: "Erro ao salvar os dados." });
  }
});

// Inicia o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
