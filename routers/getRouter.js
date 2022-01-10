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
});

router.get('/class/:id', (req, res) => {
    const classId = req.params.id;
    const sql = `
    select *
     from Classes
     where classId = ${classId}
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
});

router.get('/teacher/:id', (req, res) => {
    const teacherId = req.params.id;
    const sql = `
    select *
     from Teachers
     where teacherId = ${teacherId}
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
});

router.get('/subject/:id', (req, res) => {
    const subjectId = req.params.id;
    const sql = `
    select *
     from Subjects
     where subjectId = ${subjectId}
    `;
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
});

module.exports = router;
