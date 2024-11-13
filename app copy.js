const express = require('express');
const sql = require('mssql');
const dbConfig = require('./dbConfig');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta para obtener formas de pago usando el procedimiento almacenado con parámetros
app.get('/api/sel-afiliado', async (req, res) => {
    // Obtener los parámetros de la consulta
    const pp_id_afiliado = parseInt(req.query.pp_id_afiliado) || null; // Default to 0
    const pp_nombres = req.query.pp_nombres || null; // Default to empty string
    const pp_apellido = req.query.pp_apellido || null; // Default to 0
    const pp_nro_afiliado = parseInt(req.query.pp_nro_afiliado) || null; // Default to 0
    const pp_edad = parseInt(req.query.pp_edad) || null; // Default to null
    

    try {
        // Conectar a la base de datos
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
        .input('pp_id_afiliado', sql.Int, null)
        .input('pp_nombres', sql.VarChar(50), null)
        .input('pp_apellido', sql.VarChar(50), null)
        .input('pp_nro_afiliado', sql.Int, null)
        .input('pp_edad', sql.Int, null)
        .execute('SEL_afiliado');
        // Enviar los datos en formato JSON
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al conectar a la base de datos: ' + err.message);
    } finally {
        sql.close();
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
///http://localhost:3000/api/forma-pago?pid_forma_pago=0&pdesc_forma_pago=&plazo_primer_cuota=0&plazo_cuotas_siguientes=0&cuotas=null
//http://localhost:3000/api/forma-pago?pp_id_afiliado=0&pp_nombres=&pp_apellido=0&pp_nro_afiliado=0&pp_edad=null