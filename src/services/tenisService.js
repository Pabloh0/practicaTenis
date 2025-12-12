const Tenis = require("../database/Tenis");
const { v4: uuid } = require("uuid");

const getAllTenistas = () =>{
    try{
        const allTenistas = Tenis.getAllTenistas();
        return allTenistas;
    }catch (error){
        throw error;
    }
}

const getAllPartidos = () =>{
    try{
        const allPartidos = Tenis.getAllPartidos();
        return allPartidos;
    }catch (error){
        throw error;
    }
}

const getOneTenista = (TenistaId) => {
    try{
        const tenista = Tenis.getOneTenista(TenistaId);
        return tenista;
    }catch (error){
        throw error;
    }
    
    
}

const createNewPartido = (newPartido) => {
    const partidoToInsert = {
        ...newPartido,
        id: uuid(),
        createdAt : new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt : new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    const createdPartido = Tenis.createNewPartido(partidoToInsert);
    return createdPartido;
};




module.exports = {
    getAllTenistas,
    getAllPartidos,
    getOneTenista,
    createNewPartido,
};