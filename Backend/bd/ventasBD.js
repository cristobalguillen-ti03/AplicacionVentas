const ventasBD = require("./conexion").ventas;
const Venta = require("../clases/ventasClase");

function validarVentas(venta2) {
    var datosCorrectos = false;
    if (venta2.idUsuario != undefined && venta2.idProducto != undefined && venta2.fecha != undefined && venta2.hora != undefined && venta2.status != undefined) {
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    var ventasValidas = [];
    
    ventas.forEach(venta => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        const venta2 = venta1.getVenta;
        if (validarVentas(venta2)) {
            ventasValidas.push(venta2);
        }
    });
    
    return ventasValidas;
}

async function buscarPorIdVenta(id) {
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    var ventaValida = { error: true };
    
    if (validarVentas(venta1.getVenta)) {
        ventaValida = venta1.getVenta;
    }
    
    return ventaValida;
}

async function nuevaVenta(data) {
    data.status = "vendido";  
    const venta1 = new Venta(data);
    var ventaValida = false;
    
    if (validarVentas(venta1.getVenta)) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida = true;
    }
    
    return ventaValida;
}

async function cancelarVenta(id) {
    const venta = await buscarPorIdVenta(id);
    var cancelada = false;
    
    if (venta.error != true && venta.status !== "cancelado") {
        await ventasBD.doc(id).update({ status: "cancelado" });
        cancelada = true;
    }
    
    return cancelada;
}

async function editarVenta(id, data) {
    const venta = await buscarPorIdVenta(id);
    let editada = false;

    if (!venta.error) {
        delete data.id;

        const ventaActualizada = {
            ...venta,
            ...data
        };

        if (validarVentas(ventaActualizada)) {
            await ventasBD.doc(id).update(ventaActualizada);
            editada = true;
        }
    }
    
    return editada;
}

module.exports = {
    mostrarVentas,
    buscarPorIdVenta,
    nuevaVenta,
    cancelarVenta,
    editarVenta
};