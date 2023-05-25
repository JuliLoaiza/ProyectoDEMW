const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const mongoURL = "mongodb+srv://DEMW:DEMW@cluster0.vzc4c3i.mongodb.net/";
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Conectado a la Base de Datos");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Servidor iniciado");
});

app.post("/post", async (req, res) => {
  console.log(req.body);
  const { data } = req.body;

  try {
    if (data == "hola") {
      res.send({ status: "ok" });
    } else {
      res.send({ status: "Usuario no encontrado" });
    }
  } catch (error) {
    res.send({ status: "Algo salió mal, intenta de nuevo" });
  }
});
