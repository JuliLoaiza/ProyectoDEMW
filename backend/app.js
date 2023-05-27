const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "kjsgaduiq[adaskd][[]oaghsuidgasiug((?ASdasdasdjbdj2913yuw1ee9999";

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
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "El usuario ya existe" });
    }
    await User.create({ fname, lname, email, password: encryptedPassword });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "Usuario no encontrado" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: data });
      });
  } catch (error) {}
});
