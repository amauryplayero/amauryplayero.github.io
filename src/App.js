import logo from './logo.svg';
import {useState, useEffect} from 'react'
import './App.css';
import * as XLSX from 'xlsx'
import Button from 'react-bootstrap'
import GradesTable from './Components/gradesTable';
import PdfCreater from './Components/PdfCreater';
import {Buffer} from 'buffer';
import axios from 'axios'
import AWS from 'aws-sdk'





// // const ID = 'AKIA4XU2EYTEJIA7SLOZ';
// const SECRET = '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';
// const BUCKET_NAME = "calificacionesprueba"

// const s3 = new AWS.S3({
//   accessKeyId: ID,
//   secretAccessKey: SECRET
// });

function App() {
 
  
const [grades, setGrades] = useState('')
const [excelFile, setexcelFile] = useState()
const [objKey, setObjkey] = useState()
const [nombreDeMateria, setNombreDeMateria] = useState()
const [calificacion, setCalificacion] = useState()

  
  const onChange = (e) => {
    const [file] = e.target.files;
    
    const reader = new FileReader();
    console.log(file)
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      let body = {
        fileEncoded:bstr
      }
  
  
      axios.post('http://localhost:3003/uploadCalificaciones',body ).then(
        res=>console.log(res)
      )

      const wb = XLSX.read(bstr, { type: "binary" });
      console.log(bstr)
      setexcelFile(wb.Sheets)
      
    };
    reader.readAsBinaryString(file);
    // FUTURE REFERENCE WITH S3 BUCKET
    // let body = {
    //   fileName:'calificaciones',
    //   file: excelFile
    // }
   
  };
  const handleUploadFile = () =>{

    let base64data = Buffer.from(JSON.stringify(excelFile), 'binary');
    
  const reader = new FileReader();
    let returned= base64data.toString()
    console.log(returned)
    let body = {
      fileEncoded:base64data
    }


    // axios.post('http://localhost:3003/uploadCalificaciones',body ).then(
    //   res=>console.log(res)
    // )
 
  }


let reduced
let options

useEffect(()=>{
},[excelFile, objKey])




    const handleInput = (e) =>{
      let input = e.target.value
  }

 
  const handleGrupoSubmit =(e)=>{
    e.preventDefault()
    let gradoInputted= e.target[1].value
    let name = e.target[0].value.toUpperCase()
   
      let listaDeNombres = Object.entries(excelFile[gradoInputted]).forEach(
        ([key, value])=>{if(key.includes('B')){
          if(value.h.includes(name)){

            let keyNum = key.slice(1)
            
            
            setObjkey(keyNum)
          //  showCalificaciones(gradoInputted, keyNum)
          }
        }}
      ) 
    }

  return (
    <div className="App">
      <div>upload current calificaciones</div>
     <input type="file" onChange={(e)=>onChange(e)} />
     <button onClick={()=>handleUploadFile()}>upload</button>
     {/* <input type="button" id="upload" value="Upload" /> */}
     <div>
       {grades}
     </div>


      <div id="calificasiones">
        <h2>{}</h2>

      </div>
      
     
     
     
     

    </div>
  );
}

export default App;
