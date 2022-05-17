const { PDFDocument, StandardFonts } = require("pdf-lib")
const { writeFileSync, readFileSync, createReadStream } = require('fs')
const { StringDecoder } = require('string_decoder');
const XLSX = require('xlsx')
const utf8 = require('utf8');
const AWS = require('aws-sdk');
require('dotenv').config({path: __dirname + '/../.env'})
const {ID, SECRET, BUCKET_NAME, KEY} = process.env

const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
        });

async function getTemplate(req,res) {
      const document = readFileSync("../src/boleta.pdf");
      res.status(200).send(document)
    }

async function getConstanciaTemplate(req,res) {
    const document = readFileSync("../src/Constancia.pdf");
    res.status(200).send(document)


}
    
async function s3upload(req, res) {
        const params = {
          Bucket: BUCKET_NAME, 
          Key: KEY,
          Body: readFileSync("../src/boleta.pdf")
        };
        
        s3.upload(await params, function(err, data){
            if(err) {
                throw err
                }
            console.log(`file uploaded suzzessfully at ${data.Location}`)
        })
        res.status(200).send("file uploaded suzzessfully").catch(
            err=> res.status(400).send(err)
        )
    }


async function getCalificaciones(req, res) {
       
        const params = {
            Bucket: BUCKET_NAME, 
            Key: KEY,
          };

        const documentoExcel = s3.getObject(params, async function (err, data){
            if(err) {
                res.status(200);
                res.end('Error Fetching File');            
            }
            // var base64data = Buffer.from(data.Body, 'binary'); 
            // const buffer = Buffer.from(data.Body, {type:'utf-8'})
            // console.log(await buffer)
            const convertido = XLSX.read(data.Body, {type:'array'})
            const decoded = data.Body.toString('utf8')
            
            res.status(200).send(data.Body)        
        })

      
    }

async function uploadCalificaciones(req, res){
        // let loading = false
        const body = req.body.fileEncoded
        
        const buffer = Buffer.from(body, "utf-8")
        console.log('this is the buffer=----->', buffer)


       
        const paramsForDelete = {
            Bucket: BUCKET_NAME, 
            Key: KEY,
          };

        await s3.deleteObject(paramsForDelete, function(err, data){
            
            if(err) {
                throw err
            }
            console.log(`Archivo anterior se ha borrado.`)
            
        })

        const params = {
            Bucket: BUCKET_NAME, 
            Key: KEY,
            Body: buffer
        };
        
        await s3.upload(params, function(err, data){
        if(err) {
            throw err
        }
        res.status(200).send(`Documento se ha guardado exitosamente.`)   
        })
        
       
    }

async function deleteCalificaciones(req, res){ 

    const paramsForDelete = {
        Bucket: BUCKET_NAME, 
        Key: KEY,
        
      };
      
    s3.deleteObject(paramsForDelete, function(err, data){
            
        if(err) {
            throw err
            // res.status(400).send(err)
        } else {
        console.log(`file uploaded suzzessfully deleted from ${data.Location}`)
        res.status(200).send('success')
        }

    })
    // res.status(200).send('deleted?')

}




module.exports = {
    getTemplate,
    s3upload,
    getCalificaciones,
    getConstanciaTemplate,
    uploadCalificaciones,
    deleteCalificaciones
}