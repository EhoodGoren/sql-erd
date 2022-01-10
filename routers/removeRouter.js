const express = require('express');
const con = require('../sql-connection');

const router = express.Router();

router.delete('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = `
    delete from Students where studentId = ${studentId}
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('Deleted successfully');
    })
});

router.delete('/teacher/:id', (req, res) => {
    const teacherId = req.params.id;
    const sql = `
    delete from Teachers where teacherId = ${teacherId}
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('Deleted successfully');
    })
});

module.exports = router;
