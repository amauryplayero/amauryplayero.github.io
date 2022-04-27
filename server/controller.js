const { PDFDocument, StandardFonts } = require("pdf-lib")
const { writeFileSync, readFileSync } = require('fs')
const AWS = require('aws-sdk');
const ID = 'AKIA4XU2EYTEJIA7SLOZ';
const SECRET = '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';

const BUCKET_NAME = "calificacionesprueba"
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

  
  
  
  
  
  async function getTemplate(req,res) {
      const document = readFileSync("../src/boleta.pdf");
      // const buffered = await document.buffer()
      
      
      res.status(200).send(document)
    }
    
    async function s3upload(req, res) {
        const params = {
          Bucket: BUCKET_NAME, 
          Key: 'testFile',
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
            Key: 'testFile',
          };

    }

   async function getCalificaciones(req, res) {
        let response = JSON.stringify(req.body)
        let name = req.body.name
        let curp = req.body.curp

        const params = {
            Bucket: BUCKET_NAME, 
            Key: 'testFile',
          };
          
        s3.getObject(params, function (err, data){
            if(err) {
                res.status(200);
                res.end('Error Fetching File');            
            }
            res.send(data)
        })






        res.status(200).send(response)
    }

module.exports = {
    getTemplate,
    s3upload,
    getS3Document,
    getCalificaciones
}