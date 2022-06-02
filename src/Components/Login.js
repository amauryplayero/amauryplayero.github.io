import { PDFDropdown } from 'pdf-lib'
import { useNavigate } from "react-router-dom";
import '../App.css';
import estudianteSvg from '../estudiante.svg'
// import administradorSvg from '../administrador.svg'
import React from 'react'

export default function Login() {

let navigate = useNavigate()

    const handleClick=(e)=>{
        let routeName = e.target.id
        navigate(`/${routeName}`)
    }


  return (
      <>
      {/* <img src="https://i.imgur.com/5YACU96.jpg" id="escuelaLogo"></img> */}
      <img id="headerImage"src="https://i.imgur.com/vB3aa2E.jpg"></img>
      <div id="botonesDivContainer">
        <div id="botonesDiv">
            <div>
              <button id="estudiante" class="botonDeLogin" onClick={(e)=>handleClick(e)}><img id="estudiante" onClick={(e)=>handleClick(e)} src={estudianteSvg}></img>Soy estudiante</button>
              </div>

              <div>
                <button id="admin" onClick={(e)=>handleClick(e)} class="botonDeLogin"> <img id="admin" onClick={(e)=>handleClick(e)} src='https://i.imgur.com/H0lQl3h.png'></img>Soy administrador</button>
              </div>

              <div>
                <button id="agenda" onClick={(e)=>handleClick(e)} class="botonDeLogin"> <img id="agenda" onClick={(e)=>handleClick(e)} src='https://i.imgur.com/H0lQl3h.png'></img>Agenda</button>
              </div>
        </div>
      </div>
    </>
  )
}

