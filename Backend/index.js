const express = require("express");
const cors = require("cors");
const rutasUsuarios = require("./rutas/rutasUsuarios");
const rutasProductos = require("./rutas/rutasProductos");
const rutasVentas = require("./rutas/rutasVentas");

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use("/",rutasUsuarios, rutasProductos, rutasVentas);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port)
});