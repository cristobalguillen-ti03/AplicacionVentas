var ruta = require("express").Router();
var { mostrarVentas, nuevaVenta, cancelarVenta, buscarPorIdVenta, editarVenta } = require("../bd/ventasBD");

ruta.get("/mostrarVentas", async (req, res) => {
    const ventas = await mostrarVentas();
    res.json(ventas);
});

ruta.get("/buscarPorIdVenta/:id", async (req, res) => {
    var ventaValida = await buscarPorIdVenta(req.params.id);
    res.json(ventaValida);
});

ruta.delete("/cancelarVenta/:id", async (req, res) => {
    var cancelada = await cancelarVenta(req.params.id);
    res.json(cancelada);
});

ruta.post("/nuevaVenta", async (req, res) => {
    var ventaValida = await nuevaVenta(req.body);
    res.json(ventaValida);
});


ruta.put("/editarVenta/:id", async (req, res) => {
    const editada = await editarVenta(req.params.id, req.body);
    res.json(editada);
});

module.exports = ruta;