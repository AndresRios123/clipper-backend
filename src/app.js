//Importar dependencias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');

//Crear la app
const app = express();

//Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use( '/api/auth', authRoutes);
app.use('/api', clientRoutes);

//Ruta de health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

//Exportar
module.exports = app;