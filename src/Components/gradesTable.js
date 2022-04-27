import React from 'react'

export default function GradesTable() {
  // const onChange = (e) => {
  //   const [file] = e.target.files;
  //   const reader = new FileReader();

  //   reader.onload = (evt) => {
  //     const bstr = evt.target.result;
  //     const wb = XLSX.read(bstr, { type: "binary" });
  //     setexcelFile(wb.Sheets)
      
  //   };
  //   reader.readAsBinaryString(file);
  //   // FUTURE REFERENCE WITH S3 BUCKET
  //   // axios.get('http://localhost:3003/uploadTest').then(
  //   //   res=>console.log(res)
  //   // )
   
  // };

  

    
  
  return (
      <>
     
    <table>
    <tr>
    <th>Name</th>
    <th>Materia 1</th>
    <th>Materia 2</th>
    <th>Materia 3</th>
    <th>Materia 4</th>
    <th>Materia 5</th>
    <th>Materia 6</th>

    
  </tr>
  <tr>
    <td>Nombre del Estudiante</td>
    <td>8</td>
    <td>8</td>
    <td>8</td>
    <td>8</td>
   
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>

    </table>
    <div>gradesTable</div>
    </>
  )
}
