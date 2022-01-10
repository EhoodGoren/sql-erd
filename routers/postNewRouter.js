const express = require('express');
const con = require('../sql-connection');

const router = express.Router();

router.post('/student', (req, res) => {
    const { studentId, studentName, classId } = req.body;
    if(!studentId || !studentName || !classId) {
        return res.status(400).send('Missing information');
    }
    const sql = `
    insert into Students values
    (${studentId},'${studentName}',${classId})
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('Added');
    })
});

router.post('/teacher', (req, res) => {
    const { teacherId, teacherName } = req.body;
    if(!teacherId || !teacherName) {
        return res.status(400).send('Missing information');
    }
    const sql = `
    insert into Teachers values
    (${teacherId},'${teacherName}')
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('Added');
    })
});

module.exports = router;
