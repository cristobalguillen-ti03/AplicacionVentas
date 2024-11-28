const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../clases/usuarioClase");
const {encriptarPassword, validarPassword}=require("../middlewares/funcionesPassword")

function validarDatos(usuario2){
    var datosCorrectos = false;
    if(usuario2.nombre!=undefined && usuario2.usuario!=undefined && usuario2.password!=undefined){
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get();

    var usuariosValidos = [];
    usuarios.forEach(usuario => {
     
        const usuario1 = new Usuario({id:usuario.id,...usuario.data()});
        const usuario2 = usuario1.getUsuario;
        if(validarDatos(usuario2)){
        usuariosValidos.push(usuario2);
        }
    });
   
    return usuariosValidos;
}

async function buscarPorId(id){
    const usuario = await usuariosBD.doc(id).get();
    const usuario1 =  new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido = {error:true};
    if (validarDatos(usuario1.getUsuario)){
            usuarioValido = usuario1.getUsuario;
    }
   
    return usuarioValido;
}

async function nuevoUsuario(data){
    const {hash, salt} = encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario = "usuario";
    const usuario1 = new Usuario(data);
    var usuarioValido = false;
    if (validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido = true;
    }
    return usuarioValido;
}

async function borrarUsuario(id){
    const usuario = await buscarPorId(id);
    var borrado=false;
    if(usuario.error!=true){
        await usuariosBD.doc(id).delete();
        borrado=true;
    }
   
    return borrado;
}

async function editarUsuario(id, data) {
    const usuario = await buscarPorId(id);
    let editado = false;

    if (!usuario.error) {
        delete data.id;

        if (data.password) {
            const { hash, salt } = encriptarPassword(data.password);
            data.password = hash;
            data.salt = salt;
        }
        const usuarioActualizado = {
            ...usuario,
            ...data
        };
        if (validarDatos(usuarioActualizado)) {
            await usuariosBD.doc(id).update(usuarioActualizado);
            editado = true;
        }
    }
    
    return editado;
}

module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    editarUsuario
}

