// Estilo de un unico componente task

import { useState } from "react"

// Este componente task esta siendo utilizado en el ul del componente tasks-column


// Este componente task tiene que tener principalmente 2 la informacion y el estatus
// esa informacion me vendrá por props
export default function Task(props){

    const[idTask, updateIdTask] = useState(props.info.id);


    function selectTaskForDelete (idTask) {
        console.log('hola desde selecttask '+idTask)
        props.selectTaskFromColum(idTask);
    }




    return(

        // Una task contiene lo siguiente 
                <div>
                    {/* Contiene un icono en funcion del estatus en el que esta */}
                    <i> { props.status === 'Done' ? 'Rojo' : 'Verde' } </i>

                    {/* Nombre de la tarea */}
                    <p> { props.info.name } </p>

                    {/* Icono de borrar */}
                    {/* <i onClick={ () => console.log('borrar') }>Papelera</i> */}
                    <i onClick={ () => selectTaskForDelete(idTask) }>Papelera</i>

                    {/* Un p que contiene "el id" , "create on" "fecha"*/}
                    <p> #{props.info.id} created on {props.info.creationDate.toLocaleString()} </p>
                    {console.log('id: '+ idTask)}
                </div>



        // el status y la info se definen en el padre que es el componente task-column
    )
}