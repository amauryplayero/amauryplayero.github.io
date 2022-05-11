import { PDFDropdown } from 'pdf-lib'
import { useNavigate } from "react-router-dom";
import '../App.css';
import estudiante from '../estudiante.svg'
import React from 'react'

export default function Login() {

let navigate = useNavigate()

    const handleClick=(e)=>{
        let routeName = e.target.id
        navigate(`/${routeName}`)
    }


  return (
      <>
      <img src="https://i.imgur.com/5YACU96.jpg" id="escuelaLogo"></img>
      <img id="headerImage"src="https://i.imgur.com/vB3aa2E.jpg"></img>
      <div id="botonesDivContainer">
        <div id="botonesDiv">
            <div>
              <button id="estudiante" class="botonDeLogin" onClick={(e)=>handleClick(e)}>Soy estudiante</button>
              </div>

            <div>
              <button id="admin" onClick={(e)=>handleClick(e)} class="botonDeLogin">Soy administrador</button></div>
        </div>
      </div>
    </>
  )
}

