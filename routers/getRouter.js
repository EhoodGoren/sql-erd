const express = require('express');
const con = require('../sql-connection');

const router = express.Router();

router.get('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = `
    select *
     from Students
     where studentId = ${studentId}
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

module.exports = router;
