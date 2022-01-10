const express = require('express');
const con = require('../sql-connection');

const router = express.Router();

router.put('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const { studentName, classId } = req.body;
    if(!studentId || !studentName || !classId) {
        return res.status(400).send('Missing information');
    }
    const sql = `
    update Students
     set studentName = '${studentName}', Classes_classId = '${classId}'
     where studentId = ${studentId}
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('Updated successfully');
    })
});

router.put('/class/:id', (req, res) => {
    const classId = req.params.id;
    const { classNum } = req.body;
    if(!classId || !classNum) {
        return res.status(400).send('Missing information');
    }
    const sql = `
    update Classes
     set classNum = '${classNum}'
     where classId = ${classId}
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('Updated successfully');
    })
});

module.exports = router;
