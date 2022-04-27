import axios from 'axios'
import React from 'react'

export default function Estudiante() {

    const handleSubmit = (e) =>{
        e.preventDefault()
        let text=e.target[0].value
        let nombre=text.toUpperCase() 
        
        // fire get request to find a name that matches 
        // the name and get grades back 
        let body = {
            name:nombre,
            curp: 'future implementation'
        }
        axios.post('http://localhost:3003/getCalificaciones', body).then(
            res=> console.log(res)
        )
    }


  return (
    <>
    <div>Estudiante</div>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
        <label>
            <input placeholder="CURP"></input>
        </label>
    <input type="submit" value="Submit"></input>
    </form>

    {/* <input placeholder=""></input> */}

    </>
    
  )
}
