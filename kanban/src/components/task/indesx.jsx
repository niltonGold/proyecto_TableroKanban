// Estilo de un unico componente task

import { useState } from "react"
import './style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Card } from "@mui/material";
import { v4 as uuidv4 } from 'uuid'

// Este componente task esta siendo utilizado en el ul del componente tasks-column


// Este componente task tiene que tener principalmente 2 la informacion y el estatus
// esa informacion me vendrá por props
export default function Task(props){

    const[idTask, updateIdTask] = useState(props.info.id);

//     const[llave, updateLlave] = useState(uuidv4());

    const[index, updateIndex] = useState(props.index);



    function selectTaskForDelete (idTask) {
        console.log('hola desde selecttask '+idTask)
        props.selectTaskFromColum(idTask);
    }




    return(

        <Draggable key={props.llave}  draggableId={props.llave} index={props.index} >

         {(provided, snapshot) => (
        // Una task contiene lo siguiente
                <div className="task"
                
                
                        ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? '0.5' : '1'
                                }}
                
                
                >
                      
                      <Card>

                        <div className="status-container">
                                <div className="icon-status-container">
                                    { 
                                        props.status === 'DONE' ? 
                                                <CheckCircleOutlineOutlinedIcon sx={{ color: 'red',  fontSize:'14px'}}/> :
                                                <PendingOutlinedIcon sx={{ color: 'green',  fontSize:'15px'}}></PendingOutlinedIcon>
                                    }
                
                                </div>     

                                <div className="text-date-container">
                                       
                                        <div className="text"> { props.info.name } </div>
                                        <div className="date" > #{props.info.id} created on {props.info.creationDate.toLocaleString()} </div>
                                </div>
                        </div>

                        <div className="borrar-container">
                               
                                <DeleteIcon sx={{ color: '#636468',  fontSize:'18px'}} onClick={ () => selectTaskForDelete(idTask) } />
                        </div>
                        
                       

                        </Card>


                        
                        
                </div>
                  )}
                  </Draggable>

        

        // el status y la info se definen en el padre que es el componente task-column
    )
}