// index.js
const sql = require('mssql');
const dbConfig = require('./dbConfig');

async function connectToDatabase() {
    try {
        // Conectar a la base de datos
        let pool = await sql.connect(dbConfig);
        console.log('Conexión a la base de datos exitosa.');

        // Realizar una consulta de prueba
        let result = await pool.request().query('SELECT * FROM forma_pago');
        console.log(result.recordset);

        // Cerrar la conexión
        await sql.close();
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    }
}

// Ejecutar la función para conectarse a la base de datos
connectToDatabase();
