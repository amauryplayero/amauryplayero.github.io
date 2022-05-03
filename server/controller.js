const { PDFDocument, StandardFonts } = require("pdf-lib")
const XLSX = require('xlsx')
const { writeFileSync, readFileSync, createReadStream } = require('fs')
const utf8 = require('utf8');
const { StringDecoder } = require('string_decoder');
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

    async function getS3Document(req, res) {
        const params = {
            Bucket: BUCKET_NAME, 
            Key: KEY,
          };

    }

    async function getCalificaciones(req, res) {
       
        let name = req.body.name
        let curp = req.body.curp

        const params = {
            Bucket: BUCKET_NAME, 
            Key: 'DELETE',
          };

        const documentoExcel = await s3.getObject(params, async function (err, data){
            if(err) {
                res.status(200);
                res.end('Error Fetching File');            
            }
            var base64data = Buffer.from(data.Body, 'utf-32');    
            res.status(200).send(base64data)        
        })
    }

    async function uploadCalificaciones(req, res){
        const body = req.body.fileEncoded
        const buffer = Buffer.from(body, 'binary')
        console.log(buffer)
        const params = {
            Bucket: BUCKET_NAME, 
            Key: 'DELETE',
            Body: body
          };
           s3.upload(params, function(err, data){
        if(err) {
            throw err
        }
        console.log(`file uploaded suzzessfully at ${data.Location}`)
        })
        res.status(200).send('hai')        
    }

module.exports = {
    getTemplate,
    s3upload,
    getS3Document,
    getCalificaciones,
    uploadCalificaciones
}