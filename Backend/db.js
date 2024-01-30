const mongoose = require('mongoose');
const mongoURL="mongodb://127.0.0.1:27017/inote";

const connectToMango= ()=>{
    let connect=  mongoose.connect(mongoURL);

     connect.then(()=>{console.log("Connected to mangoose successfully ");}).catch(()=>{console.log('DB is not connected');})
   
}

// const connectToMango=async()=>{
//     mongoose.connect("mongodb://127.0.0.1:27017/inotebook").then(
//         (data)=>{
//             console.log(`connected successfully `)
//         }
//     ).catch(
//         (err)=>{
//             console.log(err)

//         }
//     )

// }


module.exports= connectToMango;
