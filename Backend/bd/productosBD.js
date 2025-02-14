const productosBD = require("./conexion").productos;
const Producto = require("../clases/productosClase");

function validarProductos(producto2){
    var datosCorrectos = false;
    if(producto2.cantidad!=undefined && producto2.precio!=undefined && producto2.descripcion!=undefined){
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarProductos(){
    const productos = await productosBD.get();
    //console.log(productos);
    var productosValidos = [];
    productos.forEach(producto => {
        //console.log(producto.data());
        const producto1 = new Producto({id:producto.id,...producto.data()});
        //console.log(producto1.getProducto);
        const producto2 = producto1.getProducto;
        if(validarProductos(producto2)){
        productosValidos.push(producto2);
        }
    });
    //console.log(productosValidos);
    return productosValidos;
}

async function buscarPorIdProductos(id){
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({descripcion: producto.descripcion,...producto.data()});
    var productoValido = {error:true};
    if (validarProductos(producto1.getProducto)){
            productoValido = producto1.getProducto;
    }
    return productoValido;
}

async function nuevoProducto(data){
    const producto1 = new Producto(data);
    var productoValido = false;
    if (validarProductos(producto1.getProducto)){
        await productosBD.doc().set(producto1.getProducto);
        productoValido = true;
    }
    return productoValido;
}

async function borrarProducto(id){
    const producto = await buscarPorIdProductos(id);
    var borrado=false;
    if(producto.error!=true){
        await productosBD.doc(id).delete();
        borrado=true;
    }
    //console.log(producto);
    return borrado;
}

async function editarProducto(id, data) {
    const producto = await buscarPorIdProductos(id);
    let editado = false;

    if (!producto.error) {
        delete data.id;

        const productoActualizado = {
            ...producto,
            ...data
        };

        if (validarProductos(productoActualizado)) {
            await productosBD.doc(id).update(productoActualizado);
            editado = true;
        }
    }
    
    return editado;
}

module.exports={
    mostrarProductos,
    buscarPorIdProductos,
    nuevoProducto,
    borrarProducto,
    editarProducto
}


