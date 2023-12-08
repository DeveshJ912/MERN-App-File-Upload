process.on('uncaughtException',(err)=>{
    console.log(err.name,err.message);
    console.log("Uncaught Exception occured, shutting Down");
    ProcessingInstruction.exit(1);
})

const mongoose = require('mongoose');

const app = require('./app');
const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" });


mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB connection succesful');
}).catch((error) => {
    console.log("error occurred", error);
})

// create server
const port = process.env.PORT || 3001;
const server = app.listen(port,()=>{
    console.log(`server has started on port ${port} !`);
})

process.on('unhandledRejection',(err)=>{
    console.log(err.name,err.message);
    console.log('unhandled rejection occured, shuttingdown...');

    server.close(()=>{
        process.exit(1);
    })
})