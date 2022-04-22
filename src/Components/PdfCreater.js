import React from 'react'
import { PDFDocument,StandardFonts, rgb} from 'pdf-lib'
import fileDownload from 'js-file-download'


export default function PdfCreater() {
  
  async function createPdf(){
    const url = 
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  
    const page = pdfDoc.addPage()
    console.log(pdfDoc)
    const { width, height } = page.getSize()
    const fontSize = 30
    page.drawText('Calificaciones', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })
  
    const pdfBytes = await pdfDoc.save()
    // fileDownload(pdfBytes,'Calificaciones')
  }


  return (
      <>
    <div>PdfCreater</div>
    <table>
    <tr>
    <th>Name</th>
    <th>Materia 1</th>
    <th>Materia 2</th>
    <th>Materia 3</th>
    <th>Materia 4</th>
    <th>Materia 5</th>
    <th>Materia 6</th>

    
  </tr>
  <tr>
    <td>Nombre del Estudiante</td>
    <td>8</td>
    <td>8</td>
    <td>8</td>
    <td>8</td>
   
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>

    </table>
    <button onClick={()=>createPdf()}>CREATE PDF</button>
    </>
  )
}
