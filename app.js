const express = require("express");
const app = express();
app.use(express.json());

app.listen(5000, () => {
  console.log("Server Started");
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
