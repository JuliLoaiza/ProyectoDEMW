const mongoose = require("mongoose");

const ServiceDetailsScehma = new mongoose.Schema(
  {
    name: String,
    descripcion: String,
    categoria: String,
    calificacion: Number,
  },
  {
    collection: "Proveedor",
  }
);

mongoose.model("Proveedor", ServiceDetailsScehma);
