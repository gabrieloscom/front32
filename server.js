// server.js
const express = require('express');
const { connectToDatabase } = require('./dbconfig');
//const afiliadosDetalleRouter = require('./routes/ins_afiliado_detalle'); // Asegúrate de que el path sea correcto


const app = express();
const port = 3000;

// Conexión a la base de datos
connectToDatabase();

// Middlewares
app.use(express.json());

// Rutas de la API
app.use('/api/sel_afiliados', require('./routes/sel_afiliados'));
app.use('/api/sel_afiliado_patologia', require('./routes/sel_afiliado_patologia'));
app.use('/api/afiliados-detalle', require('./routes/ins_afiliado_detalle'));
app.use('/api/sel_afiliado_detalle', require('./routes/sel_afiliado_detalle'));
app.use('/api/update_afiliado_detalle', require('./routes/update_afiliados_detalle'));
app.use('/api/sel_visita', require('./routes/sel_visita'));
app.use('/api/sel_control_afiliado', require('./routes/sel_control_afiliado'));
app.use('/api/ins_tercero', require('./routes/ins_tercero'));






// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

