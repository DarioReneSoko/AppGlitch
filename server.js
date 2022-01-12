// Soko Dario - Consigna: Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080: Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

// Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

const contenedor = require("./scripts/modules/contenedor.js");
const express = require("express");
const app = new express();
const productos = new contenedor("./productos.txt");
const port = 3000;

app.get("/",(req,res)=>res.send("Api Dario Soko con mucha ayuda!!!!"));

app.route("/productos").get((req, res) => {
  productos.getAll()
    .then((datos) => res.send(datos))
    .catch((error) => console.error(error.message));
});


app.route("/productosRandom").get((req, res) => {
  productos.getAll()
    .then(async (datos) =>{
        let numeroAzar = Math.floor(Math.random() * datos.length)+1;
        res.send(await productos.getById(numeroAzar));
    })
    .catch((error) => console.error(error.message));
});

app.listen(port, () => {
  console.log(`App abierta ${port}`);
});
