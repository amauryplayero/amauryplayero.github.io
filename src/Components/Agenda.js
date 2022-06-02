import React from 'react'
import Draggable from 'react-draggable'; 

export default function Agenda() {
  return (
      <>
      <Draggable>
        <div>Angela</div>
      </Draggable>

      <Draggable>
<div>Emma</div>
  </Draggable>

  <Draggable>
<div>Lovette</div>
  </Draggable>

  <Draggable>
<h2>Amaury</h2>
  </Draggable>

  <Draggable>
<h1 style={'font-size:30px'}>Amaury</h1>
  </Draggable>
    
    </>

  )
}
