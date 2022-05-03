import axios from 'axios'
import {useState, useEffect} from 'react'
import * as XLSX from 'xlsx'
import PdfCreater from './PdfCreater'
import GradesTable from './gradesTable'
import React from 'react'

export default function Estudiante() {

    const [excelFile, setExcelFile] = useState()
    const [gradeChosen, setGradeChosen] = useState()
    const [materia, setMateria] = useState([])
    const [nota, setNota] = useState([])
    // const [nombreDelAlumno, setNombreDelAlumno] = useState('')
    let reduced 

    const handleGet = (e) =>{
        e.preventDefault()
        let body = {
            name:'future impl',
            curp: 'future implementation'
        };
        axios.post('http://localhost:3003/getCalificaciones', body).then(
            res=>{
                const wb = XLSX.read(res.data, { type: "binary" });
                // console.log(wb.Sheets)
                let document = wb.Sheets
                setExcelFile(document)    

            }
        )
    }

    const showCalificaciones = async function(grado, keyNum){
        // console.log(excelFile[grado])
        let materias = []
        let notas = []
        Object.entries(excelFile[grado]).forEach(
          ([key, value])=>{
            if(key.includes('5')&& key.length===2){
              materias.push(value.h)
            }
            if(key.includes(keyNum)&&key.substring(1)===keyNum){
             
            notas.push(value.w)
            }
          }
        )
  
        for(let i = 0; i<materias.length; i++){
              if(i<10){
              console.log(materias[i], notas[i])
              }
              else{
                console.log(materias[i+2], notas[i])
              }
        }
        setNota(notas)
        setMateria(materias)
        return materias
    }

   
    
 
    const handleSubmit = (e) =>{
        e.preventDefault()
        let name = e.target[0].value.toUpperCase()
        let gradoInputted= e.target[1].value
        let listaDeNombres = Object.entries(excelFile[gradoInputted]).forEach(
            ([key, value])=>{if(key.includes('B')){
              if(value.h.includes(name)){
    
                let keyNum = key.slice(1)
                
                
             
               showCalificaciones(gradoInputted, keyNum)
              }
            }}
          ) 
   
    }
  
    if(excelFile===undefined){
        
      }else{
        reduced = Object.keys(excelFile).map(
        (element,i)=> {return (
            <option key={`uniqueId`+element} value={element}>{element}</option>
          )})
      }

  


  return (
    <>
    <div>Estudiante</div>
    <button onClick={(e)=>handleGet(e)}>get Calificaciones</button>
    <div>
    </div>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
        <label>
            <input placeholder="Nombre del alumno"></input>

            <select>
                <option>{'grado'}</option>
                {reduced}
            </select>
        </label>
    <input type="submit" value="Submit"></input>
    </form>
   

    {/* <input placeholder=""></input> */}
    <PdfCreater nota={nota}
                materia={materia}/>
    
    <GradesTable nota={nota}
                materia={materia}/>

    </>
    
  )
}
