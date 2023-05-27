const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());

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

// -------------

require("./src/components/userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    await User.create({ fname, lname, email, password });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Error" });
  }
});
