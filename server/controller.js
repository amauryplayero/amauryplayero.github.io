
const { PDFDocument, StandardFonts } = require("pdf-lib")
const { writeFileSync, readFileSync } = require('fs')


async function getTemplate(req,res) {
    const document = readFileSync("../src/boleta.pdf");
    // const buffered = await document.buffer()
    
   
    res.status(200).send(document)
}

module.exports = {
    getTemplate
}