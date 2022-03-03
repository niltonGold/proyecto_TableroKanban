import { useState } from "react";
import TaskColumn from "../tasks-column"; // Estilo de las columnas del boardKist
import './style.css';
import * as React from 'react';



import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


// Esta es una constante que ayudara a iniciilzar el boacList
// Es una array de columnas, seran 3 columnas
const initialBoard = [

    // Columna 1 TO DO
    {
        name: 'To do',
        status: 'TODO',
        showClearAll: false, // el showClearAll eliminiará todos los cards de la columna
        tasks: [] // tasks es el contenedor de las cards
    },
    // Columna 2 INPROGRES 
    {
        name: 'In progress',
        status: 'INPROGRESS',
        showClearAll: false, // el showClearAll eliminiará todos los cards de la columna
        tasks: [] // tasks es el contenedor de las cards
    },
    // Columna 1 DONE
    {
        name: 'Done',
        status: 'DONE',
        showClearAll: true, // el showClearAll eliminiará todos los cards de la columna
        tasks: [] // tasks es el contenedor de las cards
    },

];


// forma de la fecha 

let date = new Date();

let day = date.getDay();

let mes = date.toLocaleString('default', { month: 'short' });
let month  = mes.replace(/^\w/, (c) => c.toUpperCase());

console.log(month);
console.log(day);

export default function BoardContainer(){

    // Crear una constante para poder hacer un filtra y pueda mantener la informacion original
    const [originalBoard, updateOriginalBoard] = useState(initialBoard); 



    // Como estoy usando variables dentro del componente, necesito meter la variables que estoy usando en los componentes dentro
    // de un useState
    // inicializare todo el boardLista con una lista de columnas vacia
    // Necesito una array de columnas de columnas
    const [boardList , updateBoard] = useState(initialBoard);



    // Otra variable que necesita el es counter para enumerar los ids de las tasks
    const [idCounter, updateCounter] = useState(0);



    // Crear la funcion createTasks
        // a esta funcion le pasare los parametros que yo le estoy pasando desde la columna, taskname y el indice
    const createTask = (taskName, i) => { 
        // tengo que crear una nueva tarea dentro de la columna i
        // para crear una nueva tarea necesito algo que me de la informacion de la nueva tarea

        // Creo la nueva tarea
            // La nueva tarea debe tener name, fecha y id
        const newCounter = idCounter+1;
        updateCounter(newCounter);// actualizo el counter
        const task = {
            name: taskName,
            creationDate: new Date(),

            // debo tener un counter para el id
            id: newCounter
        };

        // luego de crear la tarea, debo meterlo en el array de la columna i
        boardList[i].tasks.push(task);
        updateBoard([...boardList]);// Actualizo el board, clono el array 
         // cuando quiera actualizar este board hago el updateBoard y el update del OriginalBoard, cuando cree una task
         updateOriginalBoard([...boardList]);
    }







    const deleteTask = (idtask, idColumn)=>{
    
        console.log('desde board container el id del task a borrar: ' + idtask );

        console.log('desde board container el id de la columna de la que borrare al task: ' + idColumn );

        console.log(boardList[idColumn]);

        console.log( 'delete task: '+ boardList[idColumn].tasks[0].id );

        const arraytasks = boardList[idColumn].tasks;
        
        console.log('array de task: '+arraytasks);

        arraytasks.forEach( e => console.log(e.id) );

        // const newColumn = boardList[idColumn];
        
        const indexTaskToDelete = boardList[idColumn].tasks.findIndex( (e) => e.id === idtask  );

        console.log('index de task a borrar de column: '+indexTaskToDelete);

        console.log('task sin borrar: ' + JSON.stringify(boardList[idColumn].tasks))

        boardList[idColumn].tasks.splice(indexTaskToDelete,1);

        console.log('task borrado: '+  JSON.stringify(boardList[idColumn].tasks));

        boardList.forEach( e => console.log(e) )
        
        updateBoard([...boardList]);

    

       
    
    }




// formtato de fecha









    // El filterTask es una funcion que le entra el evento,  hay que hacer un foreach
    const filterTask = (e) => {
        // Tengo que recorrer las columnas, y tengo que decir que la columna sea igual un filter de las columnas
        // con un map devuelvo un nuevo array, y ese array tiene un objeto clonado, tanto el array es diferente como los objetos
        const filteredArray = originalBoard.map( c => {
            const column = {...c}
            column.tasks = column.tasks.filter(t => t.name.toLowerCase().includes(e.target.value.toLowerCase()) )
            return column
        })

        // ahora necesito actualizar el boardLista para que se repinte
        updateBoard(filteredArray);
    }


    return(
        <main> 
            
            <section className="version_updated_search__container">

                {/* Seccion 1 de la parte de arriba del board container */}
                <section className="version10_updatedOnDate__container">
                        <div className="text_version10">Version 1.0</div>
                        <div className="texto_date">Updated on {day} {month} </div>
                </section>

                <section className="search_container">
                    {/* En el input voy a definir una funcion filterTask para realizar el filtro de tasks */}
                    {/* <input onChange={filterTask} type="text" placeholder="busca por aqui"></input> */}

                    <Paper component="form" sx={{ height:'25px' , p: '1px 2px', display: 'flex', alignItems: 'center', width: 300 }}  >
                            

                        {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}

                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>

                        <InputBase onChange={filterTask}  sx={{ ml: 1, flex: 1 }}  placeholder="Filter cards"  inputProps={{ 'aria-label': 'search google maps' }} />
                        

                        {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton> */}


                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />


                        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <DirectionsIcon />
                        </IconButton> */}


                    </Paper>







                </section>    
                
            </section>



            {/* Seccion 2 done estara el array columnas 'boarList' */}
            <section className="columns__container">
                    {/* Aqui debo pintar cada elemento del array de columnas, la forma en la que se pintara cada elemento de la columna se definira en el componente 'taks-column' */}
                    {/* le paso la informacion de info */}
                    {/* la informacion del status me viene de la columna */}
                        {/* El padre debe añadir dos props, el index que lo saca del index del map y luego el onTaskCreation */}
                    { boardList.map( (c,i) =>  <TaskColumn key={i} className="column__container" index={i} onTaskCreation={createTask} onTaskDelete={deleteTask} info={c}></TaskColumn> ) }
            </section>
            

        </main>
    )
}