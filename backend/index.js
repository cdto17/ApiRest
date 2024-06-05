const express = require('express');
const restController = require('./src/restController');
const cors = require('cors');


const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());


// Rutas RESTful
app.use('/api', restController);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});