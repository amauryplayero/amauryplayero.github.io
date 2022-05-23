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
    const [nombrePromedio, setNombrePromedio] = useState()

 

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
        let filteredEntriesThatContainNombre = entries.filter(entry=>{
            return entry[1].v==='NOMBRE DEL ALUMNO'
        })
        let filteredEntriesThatContainProm = entries.filter(entry=>{
            return entry[1].v==='PROM.'
        })


        
        let segundaTab = Object.entries(promediosDeTercero.Sheets[promediosKey])

        
        let numeroInicial 
        
        let celdasDeProm = filteredEntriesThatContainProm.map((e, i)=>{
            numeroInicial = parseInt(e[0].replace(/\D/g, ""))
            numeroInicial+=1
            return e[0]
            //  EG. 'N5'
        })
        let celdasDeNom = filteredEntriesThatContainNombre.map((e, i)=>{
            numeroInicial = parseInt(e[0].replace(/\D/g, ""))
            numeroInicial+=1
            return e[0]
            //  EG. 'N5'
        })

        let letraOnlyProm = celdasDeProm.map(e=>{
            return e.replace(/[0-9]/g, '')
        })

        let letraOnlyNom = celdasDeNom.map(e=>{
            return e.replace(/[0-9]/g, '')
        })
    
        
        let letrasDeSegundaTab = ['C', 'D', 'E']

        let archivoSegundaPestana = promediosDeTercero.Sheets[promediosKey]
        let archivoPrimeraPestana = promediosDeTercero.Sheets[promediosTrimestre1]
        console.log(archivoSegundaPestana)
       
        let nombres = []
        for (let i = 0; i<letraOnlyNom.length; i++){
            for(let n = numeroInicial; n<48; n++){
            
            if(archivoPrimeraPestana[`${letraOnlyNom[i]+n}`]===undefined){
                console.log('hai')
            }else {
                nombres.push([archivoPrimeraPestana[`${letraOnlyNom[i]+n}`].v, archivoPrimeraPestana[`${letraOnlyProm[i]+n}`].v])
            
            }
               
            }
        }
        
        console.log(nombres)
        setNombrePromedio([...nombres])
        console.log(nombrePromedio)
        // Now find the names and match them on the segunda pestana -----------------------
        

        // entry[0] va en 1Trim, entry[1] en la segunda etc
        // for(let i = 0; i<nombrePromedio; i++){
        //     for(let n =0; n<45; n++){
        //         if(nombrePromedio[i][0]===archivoSegundaPestana[`B${n}`].v){
        //             console.log(nombrePromedio[i])
        //         }
        //     }
        // }

        // nombrePromedio.map(entry=>{
        //     archivoSegundaPestana['C'] = entry
        //     =entry[1]

        // })
        
    }    

    const anadirPromediosToSheet = () =>{
        let promediosKey = Object.keys(promediosDeTercero.Sheets)[1]
        let promediosTrimestre1 = Object.keys(promediosDeTercero.Sheets)[0]
        let archivoSegundaPestana = promediosDeTercero.Sheets[promediosKey]
        let archivoPrimeraPestana = promediosDeTercero.Sheets[promediosTrimestre1]
        let entriesDeSegundaPestana = Object.entries(archivoSegundaPestana)
        
        for(let i = 0; i<entriesDeSegundaPestana.length; i++){

            let filtered = nombrePromedio.filter(e=>{
                return entriesDeSegundaPestana[i][1].v === e[0]
                  
             })

         if(filtered.length===0){
            
        }else{
            
            console.log(filtered)
            }
           
        }


        console.log(entriesDeSegundaPestana)
        

        // nombrePromedio.map(e=>{
        //     archivoSegundaPestana
        // })

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
    <button onClick={()=>anadirPromediosToSheet()}>anadir promedios to excel</button>
   
    </>
  )
}
