// Estilo de un unico componente task

import { useState } from "react"
import './style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

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
                <div className="task">

                        <div className="status-container">
                                <div className="icon-status-container">
                                    { 
                                        props.status === 'DONE' ? 
                                                <CheckCircleOutlineOutlinedIcon sx={{ color: 'red',  fontSize:'14px'}}/> :
                                                <PendingOutlinedIcon sx={{ color: 'green',  fontSize:'15px'}}></PendingOutlinedIcon>
                                    }
                
                                </div>     

                                <div className="text-date-container">
                                        {/* Nombre de la tarea */}
                                        <div className="text"> { props.info.name } </div>
                                        <div className="date" > #{props.info.id} created on {props.info.creationDate.toLocaleString()} </div>
                                </div>
                        </div>

                        <div className="borrar-container">
                                {/* Icono de borrar */}
                                {/* <i onClick={ () => console.log('borrar') }>Papelera</i> */}
                                <DeleteIcon sx={{ color: '#636468',  fontSize:'18px'}} onClick={ () => selectTaskForDelete(idTask) } />
                        </div>




                        
                        
                </div>

        

        // el status y la info se definen en el padre que es el componente task-column
    )
}