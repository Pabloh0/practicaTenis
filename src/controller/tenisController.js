const tenisService = require("../services/tenisService")


const getAllTenistas = (req, res) => {
    try{
        const allTenistas = tenisService.getAllTenistas();
        res.send({ status: "OK", data: allTenistas})
    } catch (error){
        res
        .status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}});
    }
};

const getAllPartidos = (req, res) => {
    try{
        const allPartidos = tenisService.getAllPartidos();
        res.send({ status: "OK", data: allPartidos})
    } catch (error){
        res
        .status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}});
    }
};


const getOneTenista = (req, res) => {
    const {
        params: {tenistaId},
    } = req;
    if(!tenistaId){
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {error: "Parameter ':tenistaId' can not be empty"},
        });
    }
    try{
        const tenista = tenisService.getOneTenista(tenistaId);
        res.send({ status: "OK", data: tenista});
    }catch (error){
        res.status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error}});
    }
};


const createNewPartido = (req, res) => {
    const { body } = req;
    if(
        !body.torneo ||
        !body.ronda ||
        !body.jugador1Id ||
        !body.jugador2Id ||
        !body.sets ||
        !body.ganadorId
    ) {
    return res.status(400).send({
        status: "FAILED",
        data: { error: "Faltan campos requeridos en el cuerpo de la petición." }
    });
}

    const newPartido = {
        torneo : body.torneo,
        ronda : body.ronda,
        jugador1Id : body.jugador1Id,
        jugador2Id : body.jugador2Id,
        sets : body.sets,
        ganadorId : body.ganadorId
    };
    const createNewPartido = tenisService.createNewPartido(newPartido);
    res.status(201).send({ status: "OK", data: createNewPartido});
};




module.exports = {
    getAllTenistas,
    getAllPartidos,
    getOneTenista,
    createNewPartido,
};