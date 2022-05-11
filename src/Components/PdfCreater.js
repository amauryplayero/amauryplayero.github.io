import React from 'react'
// import axios from 'axios'
import { PDFDocument,StandardFonts, rgb, PDFDropdown } from 'pdf-lib'
import {useState} from 'react'
import fileDownload from 'js-file-download'
import axios from 'axios'
import GradesTable from './gradesTable'


export default function PdfCreater(props) {
  let boton
 
  let materia = props.materia
  let infoReceived = props.materia
  let nota = props.nota

  if(infoReceived.length ===0){
    return (
      <>
      </>
    )
  } else{

  async function createPdf(){
  
 
   
    const url = 'http://localhost:3003/template'
    
    const existingPdfBytes = await fetch(url).then(res=>{
      return res.arrayBuffer()
      })
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    
    const { width, height } = firstPage.getSize()
    const fontSize = 30
    firstPage.drawText(`${materia, nota}`, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });
    const pdfBytes = await pdfDoc.save()
    fileDownload(await pdfBytes,'Calificaciones')
    // )
  
}



return (
    <>
  
  <button onClick={()=>createPdf()} id="downloadPdfButton">DOWNLOAD PDF</button>
  {boton}
  </>
)
  }

}
