module.exports = class Contenedor{
    
    constructor(file){
        this.file = file;
        this.fs = require('fs');
        this.idObjeto=0;
    }
    async save(object){
        if(object!= undefined){
            try{
                const datosArchivo = await this.getAll();
                if(datosArchivo.length>0){
                    this.idObjeto =  datosArchivo.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
                }
                this.idObjeto++;
                object.id = this.idObjeto;
                datosArchivo.push(object); 
                
                await this.fs.promises.writeFile(this.file,JSON.stringify(datosArchivo),"utf-8");
                return Promise.resolve(object.id);
            }
            catch(error){
                throw Error(`error en el metodo save ${error.message}`);
            }
              
        }else{
            Promise.reject(new Error(`No se recibio el objeto correspondiente`));
        }   
    }

    async getAll(){
        try{
            if(!this.fs.existsSync(this.file)){
                await this.fs.promises.writeFile(this.file,"","utf-8");
            }
            const contenido = await this.fs.promises.readFile(this.file,"utf-8");
            return Promise.resolve(contenido.length>0 ? JSON.parse(contenido):[]);
        }
        catch(error){
            throw Error(`error en el metodo getAll ${error.message}`);
        }
    }
    async getById(id){
        try{
            if(id!==undefined && typeof(id) === "number"){
                const datosArchivo = await this.getAll();
                const obj = datosArchivo.find(element => element.id === id);
                return obj===undefined ? Promise.reject(Error("El ID buscado no existe")) : Promise.resolve(obj);
            }else{
                throw Error("Tipo de ID invalido");
            }
        }
        catch(error){
            throw Error(`error en el metodo getById ${error.message}`);
        }
    }

    async deleteById(id){
        try{
            if(id!==undefined && typeof(id) === "number"){
                const datosArchivo = await this.getAll();
                let indice = datosArchivo.findIndex(element=> element.id === id);
                if(indice>-1){
                    datosArchivo.splice(indice,1);
                    await this.fs.promises.writeFile(this.file,JSON.stringify(datosArchivo), "utf-8");
                }
                else{
                    return Promise.reject(Error("Sin conincidencia para la eliminacion del producto"));
                }                
            }else{
                throw Error("Tipo de ID invalido");
            }
        }
        catch(error){
            throw Error(`error en el metodo deleteById ${error.message}`);
        }
        
    }

    async deleteAll(){
        try{

            await this.fs.promises.writeFile(this.file,"", "utf-8");
        }
        catch(error){
            throw Error(`error en el metodo deleteAll ${error.message}`);
        }
    }
}