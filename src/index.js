const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const v1TenisRoutes = require("../src/v1/routes/tenisRoutes")
const path = require('path');





const app = express();
app.use(cors())


app.use(
  '/assets',
  express.static(path.join(__dirname, '../src/assets'))
);

//TODO tengo que hacer el use del cors
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());//app.use(express.json())
app.use("/api/v1/tenis", v1TenisRoutes)


app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
