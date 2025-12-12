const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const v1TenisRoutes = require("../src/v1/routes/tenisRoutes")





const app = express();
app.use(cors())

//TODO tengo que hacer el use del cors
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());//app.use(express.json())
app.use("/api/v1/tenis", v1TenisRoutes)


app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
