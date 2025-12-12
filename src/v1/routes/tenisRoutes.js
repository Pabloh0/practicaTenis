const express = require("express");
const router = express.Router();
const tenisController = require("../../controller/tenisController");
const apiache = require("apicache")
const cache = apiache.middleware

router.get("/tenistas", cache("1 minutes"), tenisController.getAllTenistas);
router.get("/tenistas/:tenistaId", cache("1 minutes"), tenisController.getOneTenista);
router.get("/partidos", cache("1 minutes"), tenisController.getAllPartidos);
router.post("/partidos", tenisController.createNewPartido)



module.exports = router