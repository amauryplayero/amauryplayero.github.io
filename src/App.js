import logo from './logo.svg';
import {useState, useEffect} from 'react'
import './App.css';
import * as XLSX from 'xlsx'
import Button from 'react-bootstrap'
import GradesTable from './Components/gradesTable';
import PdfCreater from './Components/PdfCreater';
import axios from 'axios'

function App() {
 
  
const [grades, setGrades] = useState('')
const [excelFile, setexcelFile] = useState()
const [objKey, setObjkey] = useState()
const [nombreDeMateria, setNombreDeMateria] = useState()
const [calificacion, setCalificacion] = useState()
  
  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      setexcelFile(wb.Sheets)
      
    };
    reader.readAsBinaryString(file);
    // FUTURE REFERENCE WITH S3 BUCKET
    // axios.get('http://localhost:3003/uploadTest').then(
    //   res=>console.log(res)
    // )
   
  };


let reduced
let options

useEffect(()=>{
},[excelFile, objKey])


if(excelFile===undefined){
    reduced = <option>{"none"}</option>
  }else{
    reduced = Object.keys(excelFile).map(
    (element,i)=> {return (
        <option key={`uniqueId`+element} value={element}>{element}</option>
      )})
  }

    const handleInput = (e) =>{
      let input = e.target.value
  }

// 
const showCalificaciones = async function(grado, keyNum){
  let materias = []
  let notas = []
  console.log(excelFile[grado])
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
  
  // console.log(materias, notas)
    for(let i = 0; i<materias.length; i++){
        if(i<10){
        console.log(materias[i], notas[i])
        }
        else{
          console.log(materias[i+2], notas[i])
        }
      }
  }
  
  
    // 
  const handleGrupoSubmit =(e)=>{
    e.preventDefault()
    let gradoInputted= e.target[1].value
    let name = e.target[0].value.toUpperCase()
   
      let listaDeNombres = Object.entries(excelFile[gradoInputted]).forEach(
        ([key, value])=>{if(key.includes('B')){
          if(value.h.includes(name)){

            let keyNum = key.slice(1)
            
            
            setObjkey(keyNum)
           showCalificaciones(gradoInputted, keyNum)
          }
        }}
      ) 
    }

  return (
    <div className="App">
      <div>upload current calificaciones</div>
     <input type="file" onChange={(e)=>onChange(e)} />
     {/* <input type="button" id="upload" value="Upload" /> */}
     <div>
       {grades}
     </div>


      <div id="calificasiones">
        <h2>{}</h2>

      </div>
      <div>--------ADMINISTRATIVE SIDE ENDS HERE-------------</div>
      
      <GradesTable />
      <PdfCreater />
      
     

    </div>
  );
}

export default App;
