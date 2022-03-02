// Estilo a la hora de pintar cada columna
// todo lo definido en el componente task-column es lo que contendra cada columna

import { useState } from "react";
import Task from "../task/indesx";
import './style.css';


// TaskColumn es un hijo, debo recibir la informacion de padre, para recbir informacion del padre uso props
export default function TaskColumn(props){
    
    // Me voy a crear una variable de estado para para poder hacer aparecer y desaparecer el formulario mediante el uso de un booleano
    const [ isTaskCreation, showCreationForm ] = useState(false);


    // Funcion del submit del formulario
    const handleSubmit = e => {

        // Sirve para evitar que la pantalla se refresque
        e.preventDefault(); 

        // Debo obtener el valor de la task
        const taskName = e.target.taskName.value;

        // Llamo al evento onTaskCreation
        // Hace falta una prop para avisar al padre cuando se añada una card

        // Necesito una prop que es el id del array de columnas para saber que cuando se me llame al ontaskCreation yo tengo que 
        // actualizar las tasks de la columna que se ha clicado 

        // el indice de la columna me lo tiene que pasar el padre
        // de esta manera le digo al padre, en que columna se me ha añadido
        // el index es el indice de la columna, me lo tiene que pasar el padre 
        // para decirle al padre en tal columna se  ha añadido esta tarea
        props.onTaskCreation(taskName, props.index); 


        
    }




    return(
        <div>

            {/* div donde estara la cabecera de las columnas, numero de columna, nombre de la columna y el icono de agregar */}
            <div> 
                {/* Cantidad numerica de tasks */}
                        {/* Numero de tasks los saco de props.info.task.length, es decir voy a sacar la cantidad de taks que hay del */}
                        {/* componenete boardContainer---> variable boardList --> elemento columna --> atributo task.legth para saber cuantas task tiene el array task */}
                        <p> { props.info.tasks.length } </p>


                {/* Nombre de la columna */}
                        {/*  */}
                        <p> { props.info.name } </p>


                {/* Icono de agregar task */}
                        {/* Cuando se le haga click al boton add, se actuzlizara la creacion del formulario */}
                        {/* Cuando le de a ADD se me mostrara y cuando  le vuelvo a dar a ADD se me quita*/}
                        <i onClick={ () => showCreationForm(!isTaskCreation) }>Add</i>
            </div>
    
        {/* ----------------------------------------------------------------------------------------------------------------------- */}

            {/* div del formulario */}

            {/* Hay que meterle logica de javascript usando llaves */}
            <div className={ isTaskCreation ? '' : 'task__form--hidden' }>
                <form onSubmit={handleSubmit}>
                        {/* Text Area */}
                        <textarea required name="taskName" placeholder="Enter your task"></textarea>

                        {/* Boton Add */}
                            {/* Cuando clique este boton necesito pasarle al padre la informacion de la tarea */}
                            {/* la funcion de onclick debe de venir del props por que se lo tengo que pasar al padre */}
                        <button type="submit" >Add</button>
                </form>

                {/* Boton Cancel */}
                <button onClick={ () => showCreationForm(!isTaskCreation)} >Cancelar</button>
            </div>

        {/* ----------------------------------------------------------------------------------------------------------------------- */}
            {/* Listado de las tasks que hay */}

             {/* Aqui debo pintar cada elemento del array de task, los elementos estan ubicados en el componenete BoardContainer */}
             {/* en el array de columnas boardList --> dentro de un elemento de boardLista se encuentra un array de task */}
             {/* ese array de tasks es lo que debo pintar en la lista ul */}
            <ul>

                {/* el info que necesita task esta en t */}
                {/* el status que necesita task me viene de la columna */}
                {props.info.tasks.map( t => <li key={t.id}><Task info={t} status={props.info.status}></Task></li> )}
            </ul>


        </div>
    )
        // LUEGO DE TODO HAY QUE PASARLE LAS PROPS AL TASK-COLUMN, LAS PROPS DEL TASK COLUMN LAS PASO DESDE EL COMPONENTE
        // BOARD-CONTAINER
}