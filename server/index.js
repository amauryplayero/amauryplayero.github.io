const express = require('express')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3003
const app = express()
const ctrl = require('./controller')

app.use(express.json({limit: '25mb'}))
app.use(cors())
// app.get('/*', function (req,res) {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'))
// })
app.use(express.static(path.resolve(__dirname, '../build')))



app.get('/template', ctrl.getTemplate)
app.get('/uploadTest', ctrl.s3upload)
app.get('/getConstanciaTemplate', ctrl.getConstanciaTemplate)

app.get('/getCalificaciones', ctrl.getCalificaciones)
app.post('/uploadCalificaciones', ctrl.uploadCalificaciones)
app.delete('/deleteCalificaciones', ctrl.deleteCalificaciones)
app.listen(PORT, ()=>{console.log("listening on" + PORT)})