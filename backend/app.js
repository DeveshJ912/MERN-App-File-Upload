const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors());

app.use('/users',require('./routes/UserRoutes'));
app.use('/files',require('./routes/FilesRoute'));
app.all('*',(req,resp,next)=>{
    resp.status(404).json({
        status:'fail',
        sttausCode:404,
        message:`can't find ${req.originalUrl} on the server.`
    })
})

module.exports = app;