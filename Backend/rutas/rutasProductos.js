var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarPorIdProductos, editarProducto } = require("../bd/productosBD");

ruta.get("/mostrarProductos", async (req, res) => {
    const productos = await mostrarProductos();
    res.json(productos);
});

ruta.get("/buscarporIdProductos/:id", async (req, res) => {
    var productoValido = await buscarPorIdProductos(req.params.id);
    res.json(productoValido);
});

ruta.delete("/borrarProducto/:id", async (req, res) => {
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoProducto", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

ruta.put("/editarProducto/:id", async (req, res) => {
    const editado = await editarProducto(req.params.id, req.body);
    res.json(editado);
});

module.exports = ruta;