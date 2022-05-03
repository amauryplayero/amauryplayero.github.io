import React from 'react'

export default function GradesTable(props) {
  console.log(props)
  let materia = props.materia
  let nota = props.nota


  let materiasForTh = materia.map((e,i)=>{
    return <th>{e}</th>
  })

  let notasForTd = nota.map((e,i)=>{
 
      return <td>{e}</td>
    
  })

  return (
      <>
     
    <table>
    <tr>
    {materiasForTh}

    
    </tr>
    <tr>
    {notasForTd}
    </tr>
  
    </table>
    <div>gradesTable</div>
    </>
  )
}
