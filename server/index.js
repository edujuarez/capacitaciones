
const express = require('express');
const app = express();
const mysql = require('mysql');


app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capacitacionesdb'
});

//get rows
app.get('/asistente', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistentes',(err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});

//get asistentes by ID
app.get('/asistente/:id', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistentes WHERE idasistente = ?', [req.params.id], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});

//Delete asistente
app.delete('/asistente/:id', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('DELETE from asistentes WHERE idasistente = ?', [req.params.id], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                res.send(`asistente con el ID: ${[req.params.id]} ha sido eliminado`)
            } else {
                console.log(err)
            }
        })
    })
});

//Add an asistentes
app.post('/asistente/nuevo', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        const params = req.body
        connection.query('INSERT INTO asistentes SET ?', params, (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                res.send(` el asistente ${params.nombre} ha sido agregado.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})

//Edit/update an asistente
app.put('/asistente', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw errcd
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        const {
            idasistente,
            nombre,
            legajo,
            tipodoc,
            dni,
            cargo,
            sector,
            fechaingreso
        } = req.body

        connection.query('UPDATE asistentes SET nombre = ?, legajo = ?, tipodoc = ?, dni = ?, cargo = ?, sector = ?, fechaingreso = ? WHERE idasistente = ?',
        [nombre, legajo, tipodoc, dni, cargo, sector, fechaingreso, idasistente], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                res.send(` el asistente ${nombre} ha sido modificado.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


//se activa puerto en puerto especifico
const PORT = 3006
app.listen(PORT, () => {
   console.log(`Corrriendo en ${PORT}`); 
});
