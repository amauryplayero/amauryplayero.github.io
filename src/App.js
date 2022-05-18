import logo from './logo.svg';
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './App.css';
import * as XLSX from 'xlsx'
import Button from 'react-bootstrap'
import GradesTable from './Components/gradesTable';
import PdfCreater from './Components/PdfCreater';
import {Buffer} from 'buffer';
import axios from 'axios'
import AWS from 'aws-sdk'


function App() {
  let navigate = useNavigate()

 
  
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
      let body = {
        fileEncoded:bstr
      }

      const wb = XLSX.read(bstr, { type: "binary" });
      setexcelFile(wb.Sheets)
      
    };
    reader.readAsBinaryString(file);

  };

  const handleUploadFile = () =>{
    if(excelFile===undefined){
      alert('Elija documento')
    } else {
    const file = JSON.stringify(excelFile)
    let body = {
      fileEncoded:file
    }
    axios.post('http://localhost:3003/uploadCalificaciones',body).then(
      res=>{
      alert(res.data)
      navigate('/')
      }
    ).catch(err=> alert(err))
 
  }
}




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
          }
        }}
      ) 
    }

    const handleBackButton = () =>{
      navigate('/')
    }



  return (
    <>
      <button onClick={()=>handleBackButton()}>go back</button>
      <div id="dropZoneContainer">
        {/* <div id="dropZone" ondrop={()=>handleUploadFile()}>
              <p>Drag one or more files to this Drop Zone ...</p>
        </div> */}
      </div>

    <div className="App">
      <div id="fileUploadContainer">
        <div id="fileUpload">
            <p>Seleccione calificaciones actuales</p>
          <input type="file" onChange={(e)=>onChange(e)} />
          <button onClick={()=>handleUploadFile()} id="uploadFileButton">UPLOAD</button>
        </div>
        {/* <input type="button" id="upload" value="Upload" /> */}
     </div>
     <div>
       {grades}
     </div>


      <div id="calificasiones">
        <h2>{}</h2>

      </div>

    </div>
    </>
  );
}

export default App;
