const express = require('express')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3003
const app = express()
const ctrl = require('./controller')

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../build')))


// app.get('/*', function (req,res) {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'))
// })

app.get('/template', ctrl.getTemplate)

app.listen(PORT, ()=>{console.log("listening on" + PORT)})