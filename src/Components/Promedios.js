import React from 'react'
import {useState, useEffect} from 'react'
import XLSX_ZAHL_PAYLOAD from 'https://cdn.sheetjs.com/xlsx-0.18.7/package/dist/xlsx.zahl.mjs';
import * as XLSX from 'xlsx'
import '../App.css';

export default function Promedios() {

    const [excelFile, setExcelFile] = useState() 
    const [promediosDePrimero, setPromediosDePrimero] = useState()
    const [promediosDeSegundo, setPromediosDeSegundo] = useState()
    const [promediosDeTercero, setPromediosDeTercero] = useState()

 

    const createExcel = (file) =>{  
        const reader = new FileReader();
        reader.onload = (evt) => {
         
            const bstr = evt.target.result;
            let body = {
              fileEncoded:bstr
            }
      
            const wb = XLSX.read(bstr, { type: "binary" });
            
            
            
        };
        reader.readAsBinaryString(file);
        
    }

    // const handleChange = (e) =>{
    //     const [file] = e.target.files
    //     const reader = new FileReader();
    //     reader.onload = (evt) => {
         
    //         const bstr = evt.target.result;
    //         let body = {
    //           fileEncoded:bstr
    //         }
      
    //         const wb = XLSX.read(bstr, { type: "binary" });
    //         setExcelFile(wb)
            
            
    //       };
    //       reader.readAsBinaryString(file);

    // }

    const handlePrimerAno = (e) =>{

        const [file] = e.target.files
        const reader = new FileReader();
        reader.onload = (evt) => {
         
            const bstr = evt.target.result;
            let body = {
              fileEncoded:bstr
            }

            const wb = XLSX.read(bstr, { type: "binary" });
            setPromediosDePrimero(wb)
            
        };
        reader.readAsBinaryString(file);

    }
    // console.log(promediosDePrimero.Sheets["Table 1"])
  
    const handleSegundoAno = (e) =>{
        
    }

    const handleTercerAno = (e) =>{
        const [file] = e.target.files
        const reader = new FileReader();
        reader.onload = (evt) => {
         
            const bstr = evt.target.result;
            let body = {
              fileEncoded:bstr
            }

            const wb = XLSX.read(bstr, { type: "binary" });
            setPromediosDeTercero(wb)
            
        };
        reader.readAsBinaryString(file);
        
    }

    const createPromedios = () =>{
        let promediosKey = Object.keys(promediosDeTercero.Sheets)[1]
        
        let promediosTrimestre1 = Object.keys(promediosDeTercero.Sheets)[0]
        let object = promediosDeTercero.Sheets[promediosTrimestre1]
        let entries = Object.entries(promediosDeTercero.Sheets[promediosTrimestre1])
        // array of arrays. inside contains the object
        let filteredEntriesThatContainProm = entries.filter(entry=>{
            return entry[1].v==='NOMBRE DEL ALUMNO'
        })

        let segundaTab = Object.entries(promediosDeTercero.Sheets[promediosKey])

    


        let numeroInicial 

        let celdas = filteredEntriesThatContainProm.map((e, i)=>{
           numeroInicial = parseInt(e[0].replace(/\D/g, ""))
            numeroInicial+=1
            return e[0]
            //  EG. 'N5'
        })
  
        let letraOnly = celdas.map(e=>{
           return e.replace(/[0-9]/g, '')
        })

        let letrasDeSegundaTab = ['C', 'D', 'E', 'F']
        
        let archivo = promediosDeTercero.Sheets
        
        console.log(promediosDeTercero.Sheets[promediosKey])

        console.log(letraOnly)
        

    
        
        let promedioCelda = promediosDeTercero.Sheets[promediosKey].C6.v
        // promedioCelda = 


    }
  
    async function changeValue (){
        excelFile.Sheets["CONCENTRADOS DE LOS TRIM"].G7 = { t:'n', v:93, w:'93'} 
        // let modifiedFile =  excelFile.Sheets["CONCENTRADOS DE LOS TRIM"].G7 = { t:'n', v:93, w:'93'} 
        // let modifiedWb = XLSX.write(modifiedFile, {})
        XLSX.writeFile(excelFile,'TEST DELETE.xlsx', { ignoreEC: true, bookType: 'xlsx'})
    }

    let fileChecker = <img src="https://i.imgur.com/52es1vp.png" class="checkMarkIcon"></img>


  return (
      <>
    <div>Promedios</div>

    <div>
    <h3>1er Año </h3>
    <input type="file" onChange={(e)=>handlePrimerAno(e)} />
    </div>

    <h3>2do Año</h3>
    <input type="file" onChange={(e)=>handleSegundoAno(e)} />
    
   
    
    <h3>3er Año</h3>
    <input type="file" onChange={(e)=>handleTercerAno(e)} />
    
   
    <br></br>
    <br></br>
    <button onClick={()=>createPromedios()}>get promedios</button>
   
    </>
  )
}
