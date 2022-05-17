import axios from 'axios'
import React from 'react'
import * as XLSX from 'xlsx'
import { PDFDocument,StandardFonts, rgb, PDFDropdown } from 'pdf-lib'
import fileDownload from 'js-file-download'


export default function ConstanciaCreater(props) {
    let infoReceived = props.nota
    let materia = props.materia
    let nombreDelAlumno = props.nombreDelAlumno
    let grado = props.grado
    let cicloEscolar = props.cicloEscolar
    let yearOnly = cicloEscolar.substring(cicloEscolar.indexOf('2'))

    

    let nota = props.nota

    const url = 'http://localhost:3003/getConstanciaTemplate'

    async function handleClick () {
        const existingPdfBytes = await fetch(url).then(res=>{
            return res.arrayBuffer()
            })
          const pdfDoc = await PDFDocument.load(existingPdfBytes)
          const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        
          const pages = pdfDoc.getPages()
          const firstPage = pages[0]
      
          
          const { width, height } = firstPage.getSize()
          const fontSize = 10
          let vertical = 418
          
        let filteredMaterias = materia.filter(function(cv, i){
              let materiaOnly = cv.split('/')[0]
              return i>1 && i<11 
        })
        
        filteredMaterias.map((e,i)=>{
                
            let horizontal = 200
            let placement = {
                x: horizontal,
                y: vertical,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0,1,0)
            }

            let materiaNameOnly = e.split('/')[0]

            firstPage.drawText(`${materiaNameOnly}`, placement);
            vertical-= 14.5
        })

           // NOMBRE
        firstPage.drawText(`${nombreDelAlumno}`, {
            x: 200,
            y: 530,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(1, 0, 0),
          });

        //   GRADO
        let gradoOnly = grado.slice(0,-1)
          firstPage.drawText(`${gradoOnly}`, {
            x: 289,
            y: height - 29.5 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(1, 0, 0),
          });
        //  GRUPO
          firstPage.drawText(`${grado[2]}`, {
            x: 375,
            y: 495,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(1, 0, 0),
          });
        
        // CICLO ESCOLAR
        firstPage.drawText(`${yearOnly}`, {
            x: 200,
            y: 480,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(1, 0, 0),
          });
        //   ////////////////////////////////////

          const pdfBytes = await pdfDoc.save()
          fileDownload(await pdfBytes,'Constancia')
    }
    

    if(infoReceived.length === 0){
        return(
        <>
        </>
        )
    }else {
    return (
        <>

        <button onClick={()=>handleClick()}>DESCARGA CONSTANCIA</button>
        </>
    )
    }
}
