class Venta {
    constructor(data) {
        this.id=data.id;
        this.idUsuario=data.idUsuario;
        this.idProducto=data.idProducto;
        this.hora=data.hora;
        this.fecha=data.fecha;
        this.status=data.status;
    }
    set id(id){
        this._id=id;
    }
    set idUsuario(idUsuario){
        this._idUsuario=idUsuario;
    }
    set idProducto(idProducto){
        this._idProducto=idProducto;
    }
    set hora(hora){
        this._hora=hora;
    }
    set fecha(fecha){
        this._fecha=fecha;
    }
    set status(status){
        this._status=status;
    }
    get id(){
        return this._id;
    }
    get idUsuario(){
        return this._idUsuario;
    }
    get idProducto(){
        return this._idProducto;
    }
    get hora(){
        return this._hora;
    }
    get fecha(){
        return this._fecha;
    }
    get status(){
        return this._status;
    }
    get getVenta() { 
        const conid = {
            id: this._id,
            idUsuario: this._idUsuario,
            idProducto: this._idProducto,
            hora: this._hora,
            fecha: this._fecha,
            status: this._status
        }
        const sinid = {
            idUsuario: this._idUsuario,
            idProducto: this._idProducto,
            hora: this._hora,
            fecha: this._fecha,
            status: this._status
        }
        if (this.id !== undefined) {
            return conid;
        } else {
            return sinid;
        }
    }
}

module.exports = Venta;