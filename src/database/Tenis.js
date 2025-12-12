const DB = require("./DB.json")
const fs = require("fs");
const path = require("path");
const { all } = require("../v1/routes/tenisRoutes");

const getAllTenistas = () => {
    try {
        let tenistas = DB.tenistas;
        return tenistas;

    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getAllPartidos = () => {
    try{
        let partidos = DB.partidos;
        return partidos;

    }catch (error) {
        throw { status: 500, message: error};
    }
}


const getOneTenista = (TenistaId) => {
    try{
        const tenista = DB.tenistas.find((tenista) => tenista.id === TenistaId);
        if(!tenista) {
            throw {
                status: 400,
                message: `No se enceuntra workout con la id '${TenistaId}'`,
            };
        }
        return tenista;
    }catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const createNewPartido = (newPartido) => {
  DB.partidos.push(newPartido);
  saveToDatabase(DB);
  return newPartido;
};

const saveToDatabase = (DB) => {
    fs.writeFileSync("src/database/DB.json", JSON.stringify(DB, null, 2), {
        encoding: "utf8"
    });

}

module.exports = {
    getAllTenistas,
    getAllPartidos,
    getOneTenista,
    createNewPartido,
}