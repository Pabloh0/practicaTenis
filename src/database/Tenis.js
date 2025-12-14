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

const updateOneTenista = (tenistaId, changes) => {
    console.log(changes)
    try{
        const isAlreadyAdded =
        DB.tenistas.findIndex((tenista) => tenista.nombre === changes.nombre) > -1;
        if(isAlreadyAdded){
            throw{
                status : 400,
                message: `Tenista con el nombre '${changes.nombre}' ya existe`
            };
        }
        const indexForUpdate = DB.tenistas.findIndex((tenista) => tenista.id === tenistaId
    );
    if(indexForUpdate === -1){
        throw{
            status: 400,
            message: `Can't find tenista with the id '${tenistaId}'`,
        };
    }
    const updatedTenista = {
        ...DB.tenistas[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
    };
    DB.tenistas[indexForUpdate] = updatedTenista;
    saveToDatabase(DB);
    return updatedTenista;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
};


const updateOnePartido = (partidoId, changes) => {
    console.log(changes)
    try{
        const indexForUpdate = DB.partidos.findIndex((partido) => partido.id === partidoId
    );
    if(indexForUpdate === -1){
        throw{
            status: 400,
            message: `Can't find Partido with the id '${partidoId}'`,
        };
    }
    const updatedPartido = {
        ...DB.partidos[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
    };
    DB.partidos[indexForUpdate] = updatedPartido;
    saveToDatabase(DB);
    return updatedPartido;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error};
    }
};

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
    updateOneTenista,
    updateOnePartido,
}