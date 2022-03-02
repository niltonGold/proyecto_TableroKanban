import { useState } from "react";
import TaskColumn from "../tasks-column"; // Estilo de las columnas del boardKist
import './style.css';



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
            

            {/* Seccion 1 de la parte de arriba del board container */}
            <section>
                <div>
                    <h1>Version 1.0</h1>
                    <p>Updated on  ---Algo---</p>
                </div>
                {/* En el input voy a definir una funcion filterTask para realizar el filtro de tasks */}
                <input onChange={filterTask} type="text" placeholder="busca por aqui"></input>
            </section>


            {/* Seccion 2 done estara el array columnas 'boarList' */}
            <section className="columns__container">
                    {/* Aqui debo pintar cada elemento del array de columnas, la forma en la que se pintara cada elemento de la columna se definira en el componente 'taks-column' */}
                    {/* le paso la informacion de info */}
                    {/* la informacion del status me viene de la columna */}
                        {/* El padre debe añadir dos props, el index que lo saca del index del map y luego el onTaskCreation */}
                    { boardList.map( (c,i) =>  <TaskColumn key={i} className="column__container" index={i} onTaskCreation={createTask} info={c}></TaskColumn> ) }
            </section>



        </main>
    )
}