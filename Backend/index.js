const connectToMango=require("./db");
const express = require('express')
var cors = require('cors')

connectToMango();      // not sure its working or not

const app = express()
const port = 5000            //changed port to 5000 as frontend working on 3000


app.use(cors())                // to communicate beetween backend and frontend

app.use(express.json());                    // this require to access body


//Available routes
app.use("/api/auth", require("./routes/auth"));    //module.exports = router imported here
app.use("/api/notes", require("./routes/notes"));



app.listen(port, () => {
  console.log(`inote app listening on port ${port}`)
})
