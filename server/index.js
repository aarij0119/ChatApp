const express = require('express');
const app = express()

app.get('/',function(req,res){
    res.send('Connected To backend')
})

app.listen(3000)