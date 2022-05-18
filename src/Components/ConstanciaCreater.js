import axios from 'axios'
import React from 'react'
import * as XLSX from 'xlsx'
import { PDFDocument,StandardFonts, rgb, PDFDropdown } from 'pdf-lib'
import fileDownload from 'js-file-download'


export default function ConstanciaCreater(props) {
    let infoReceived = props.nota
    
    let nota = props.nota
    let materia = props.materia
    let nombreDelAlumno = props.nombreDelAlumno
    let grado = props.grado
    let cicloEscolar = props.cicloEscolar
    let yearOnly = cicloEscolar.substring(cicloEscolar.indexOf('2'))
    let promedio = props.nota[16]

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
         
          
        let filteredMaterias = materia.filter(function(cv, i){
              let materiaOnly = cv.split('/')[0]
              return i>1 && i<11 
        })

        let filteredNotas = nota.filter(function(cv,i){
            if(i>1 && i<11){
              return i
            }
        })

        filteredNotas.push(promedio)
        

        function drawInCells(input, column){
          let vertical = 418

          return input.map((e,index)=>{
            let horizontal 
            let element

            if(column==='left'){
              element = e.split('/')[0]
              horizontal = 200 }
            else {
              element = e
              horizontal = 365 

            }

            let placement = {
              x: horizontal,
              y: vertical,
              size: fontSize,
              font: timesRomanFont,
              color: rgb(1, 0, 0)
            }

            firstPage.drawText(`${element}`, placement);
            
            index===5 ? vertical-=27.5 : vertical-= 14.5
          })
        }

        drawInCells(filteredMaterias, 'left')
        drawInCells(filteredNotas, 'right')



           // NAME
        firstPage.drawText(`${nombreDelAlumno}`, {
            x: 200,
            y: 530,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(1, 0, 0),
          });

        //   GRADE
        let gradoOnly = grado.slice(0,-1)
          firstPage.drawText(`${gradoOnly}`, {
            x: 289,
            y: height - 29.5 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(1, 0, 0),
          });
        //  GROUP
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

        <button onClick={()=>handleClick()}>CONSTANCIA EN PDF</button>
        </>
    )
    }
}
