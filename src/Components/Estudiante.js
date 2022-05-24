import axios from 'axios'
import {useState, useEffect} from 'react'
import * as XLSX from 'xlsx'
import PdfCreater from './PdfCreater'
import GradesTable from './gradesTable'
import ConstanciaCreater from './ConstanciaCreater'
import {useNavigate} from 'react-router-dom'
import {Buffer} from 'buffer';
import React from 'react'



export default function Estudiante() {
    const navigate = useNavigate()
    const [excelFile, setExcelFile] = useState()
    const [gradeChosen, setGradeChosen] = useState()
    const [materia, setMateria] = useState([])
    const [nota, setNota] = useState([])
    const [signedIn, setSignedIn] = useState(false)
    const [nombreDelAlumno, setNombreDelAlumno] = useState('')
    const [cicloEscolar, setCicloEscolar] = useState('')


    // const [nombreDelAlumno, setNombreDelAlumno] = useState('')
    let reduced 
    useEffect(() => {
      axios.get('http://localhost:3003/getCalificaciones').then(
          res=>{
       
            setExcelFile(res.data)
          }
      )
      
    }, []);

    const showCalificaciones = async function(grado, keyNum){
       console.log(excelFile[grado])
        let sheet = excelFile[grado]
        let materias = []
        let notas = []
        Object.entries(excelFile[grado]).forEach(

          ([key, value])=>{
            // excel cell
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
        let nombre = notas[1]
        let cicloEscolar = sheet.A3.v
        setCicloEscolar(cicloEscolar)
        setNombreDelAlumno(nombre)
        setNota(notas)
        setMateria(materias)
        return materias
    }
    
 
    const handleSubmitForm = (e) =>{
        e.preventDefault()
        let name = e.target[0].value.toUpperCase()
        let gradoInputted= e.target[1].value
        
        if(name.length===0 || gradoInputted===''){
          alert('Porfavor llene la informacion correctamente ')
        } else{
          setGradeChosen(gradoInputted)
          let listaDeNombres = Object.entries(excelFile[gradoInputted]).forEach(
            ([key, value])=>{if(key.includes('B')){
              if(value.h.includes(name)){
                
                let keyNum = key.slice(1)
                
                showCalificaciones(gradoInputted, keyNum)
              } else {

              }
            }}
            )
            setSignedIn(true)
          }

   
    }

    if(excelFile===undefined){    
      }else{
        reduced = Object.keys(excelFile).map(
        (element,i)=> {return (
            <option key={`uniqueId`+element} value={element}>{element}</option>
          )})
      }

  
    const handleBackButton = () =>{
        navigate('/')
      }
      
    let formElement 

    if(signedIn){
      formElement = <div></div>
    }else {
      formElement = <form id="form"onSubmit={(e)=>{handleSubmitForm(e)}}>
      <label id="labelInput">
        <div id="inputContainer">
          <p>Nombre Completo</p>
          <input placeholder="" id="nombreInput"></input>
          <p>grado</p>
            <select id="gradoSelect">
              
                <option>{''}</option>
                {reduced}
            </select>
             <input type="submit" value="Submit" id="submitButton"></input>
        </div>
      </label>
      </form>
    }

  return (
    <>
    <img src="https://portal.andina.pe/EDPfotografia3/Thumbnail/2019/08/09/000610383W.jpg" id="headerImage"></img>
    <button onClick={()=>handleBackButton()}>go back</button>

    <div>Estudiante</div>
    
   
    {formElement}
   

    {/* <input placeholder=""></input> */}
    
    <GradesTable nota={nota}
                materia={materia}/>
    
    <PdfCreater nota={nota}
                materia={materia}/>
    <br></br>
    <br></br>
    <ConstanciaCreater nota={nota}
                        materia={materia}
                        nombreDelAlumno={nombreDelAlumno}
                        grado={gradeChosen}
                        cicloEscolar={cicloEscolar}/>
    

    </>
    
  )
}
