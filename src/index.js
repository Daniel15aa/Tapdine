const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/nfc-event", (req, res) => {
  const { tagId, type } = req.body;
  console.log(`Evento NFC recebido: tipo=${type}, tagId=${tagId}`);
  res.status(200).json({ received: true });
});

app.get("/health", (req, res) => res.status(200).send("ok"));

app.listen(PORT, () => console.log(`TapDine backend rodando na porta ${PORT}`));