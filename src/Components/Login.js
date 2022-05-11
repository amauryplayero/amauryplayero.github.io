import { PDFDropdown } from 'pdf-lib'
import { useNavigate } from "react-router-dom";
import React from 'react'

export default function Login() {

let navigate = useNavigate()

    const handleClick=(e)=>{
        let routeName = e.target.id
        navigate(`/${routeName}`)
    }


  return (
      <>
    <div><button id="admin" onClick={(e)=>handleClick(e)}>I am an Administrador</button></div>
    <div><button id="estudiante" onClick={(e)=>handleClick(e)}>I am an Estudiante</button></div>
    </>
  )
}

