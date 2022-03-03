// Estilo a la hora de pintar cada columna
// todo lo definido en el componente task-column es lo que contendra cada columna

import { useState } from "react";
import Task from "../task/indesx";
import './style.css';
import AddIcon from '@mui/icons-material/Add';


// TaskColumn es un hijo, debo recibir la informacion de padre, para recbir informacion del padre uso props
export default function TaskColumn(props){
    
    // Me voy a crear una variable de estado para poder hacer aparecer y desaparecer el formulario mediante el uso de un booleano
    const [ isTaskCreation, showCreationForm ] = useState(false);

    // Me voy a crear una variable de estado para poder hacer habilitar o desabilitar el boton del formulario Add
    const [ buttonAddEnable, updateButtonAddEnable ] = useState(false);


    const [ botonMas, upDateBotonMas ] = useState(true);



    const [ botonAdd, upDateBotonAdd ] = useState(false);


    // Funcion del submit del formulario
    const handleSubmit = (e) => {

        // Sirve para evitar que la pantalla se refresque
        e.preventDefault(); 

        // Debo obtener el valor de la task
        const taskName = e.target.taskName.value;
        console.log(taskName);
        // Llamo al evento onTaskCreation
        // Hace falta una prop para avisar al padre cuando se añada una card

        // Necesito una prop que es el id del array de columnas para saber que cuando se me llame al ontaskCreation yo tengo que 
        // actualizar las tasks de la columna que se ha clicado 

        // el indice de la columna me lo tiene que pasar el padre
        // de esta manera le digo al padre, en que columna se me ha añadido
        // el index es el indice de la columna, me lo tiene que pasar el padre 
        // para decirle al padre en tal columna se  ha añadido esta tarea
        props.onTaskCreation(taskName, props.index);


        e.target.taskName.value = ''; // vaciar el textarea

    }




    const enableAddButton = (text) => {
        let texto = ''; 
        texto = text.target.value;
        // console.log('add habilitado');
        // console.log(texto);
        if ( (texto === '')){
            // console.log('cuadro de texto vacio');
            updateButtonAddEnable(false);

        }else{
        // console.log(typeof(texto));
        updateButtonAddEnable(true);
        }

    }




    function selectTaskId (idtask){
        // idTask es el id de una tarea
        // idColumn es el id la columa de la que voy a borrar el task 

        const idColumn = props.index;
        console.log('desde task colum id del task a borrar: '+idtask);
        console.log('desde task colum id de la columna donde borrare el task: '+idColumn);

        props.onTaskDelete(idtask, idColumn);
    } 






    const botonMasEventos = () =>{
       
        showCreationForm(!isTaskCreation);
        upDateBotonMas(false);
      

    }



    const botonCancelarEventos = (c) => {
        
        showCreationForm(false);
        upDateBotonMas(true);
        updateButtonAddEnable(false);
    
    }

    const botonAddEventos = (a) => {
        showCreationForm(!isTaskCreation);
        upDateBotonMas(true);   
        updateButtonAddEnable(false); 
    }





    return(
        <div className="columns">

            {/* div donde estara la cabecera de las columnas, numero de columna, nombre de la columna y el icono de agregar */}
            <div className="column_head"> 

                    <div className="column_container-lengh-nameOfColumn">

                    {/* Cantidad numerica de tasks */}
                            {/* Numero de tasks los saco de props.info.task.length, es decir voy a sacar la cantidad de taks que hay del */}
                            {/* componenete boardContainer---> variable boardList --> elemento columna --> atributo task.legth para saber cuantas task tiene el array task */}
                            <p> { props.info.tasks.length } </p>


                    {/* Nombre de la columna */}
                            <p> { props.info.name } </p>
                    </div>

                    {/* Icono de agregar task */}
                            {/* Cuando se le haga click al boton add, se actuzlizara la creacion del formulario */}
                            {/* Cuando le de a ADD se me mostrara y cuando  le vuelvo a dar a ADD se me quita*/}
                            {/* <AddIcon className="iconADD" onClick={ () => showCreationForm(!isTaskCreation) }/> */}
                          
                    <AddIcon className={ botonMas ? "iconADD-enable" : "iconADD-disable"} onClick={ botonMasEventos }/>
                    
            </div>
    
        {/* ----------------------------------------------------------------------------------------------------------------------- */}

            {/* FORMULARIO*/}

            {/* Hay que meterle logica de javascript usando llaves */}
            <div className={ isTaskCreation ? '' : 'task__form--hidden' }>
                <form className="formulario_textArea-cancel-add" onSubmit={handleSubmit}>
                        
                        {/* Text Area */}
                        <textarea onChange={enableAddButton} className="area_text" required name="taskName" placeholder="Enter your task" placeholder="escribe aqui"></textarea>

                        <div className="buttons_cancel-add">
                                {/* Boton Add */}
                                    {/* Cuando clique este boton necesito pasarle al padre la informacion de la tarea */}
                                    {/* la funcion de onclick debe de venir del props por que se lo tengo que pasar al padre */}
                                <button className={ buttonAddEnable ?  "btn_add-enable" : "btn_add-disable" } type="submit" onClick={ botonAddEventos } >Add</button>

                                <button type="reset" className="btn_cancel" onClick={ botonCancelarEventos } >Cancelar</button>

                        </div>
                        
                </form>
            </div>

        {/* ----------------------------------------------------------------------------------------------------------------------- */}
            {/* LISTA DE TASKS */}

             {/* Aqui debo pintar cada elemento del array de task, los elementos estan ubicados en el componenete BoardContainer */}
             {/* en el array de columnas boardList --> dentro de un elemento de boardLista se encuentra un array de task */}
            <div className="list_container">
                {/* <div className="div_prueba"> */}

                        {/* el info que necesita task esta en t */}
                        {/* el status que necesita task me viene de la columna */}
                        {props.info.tasks.map( t =><Task key={t.id} info={t} status={props.info.status} selectTaskFromColum={ selectTaskId }  ></Task>)}
            </div>
                {/* </div> */}

        </div>
    )
        // LUEGO DE TODO HAY QUE PASARLE LAS PROPS AL TASK-COLUMN, LAS PROPS DEL TASK COLUMN LAS PASO DESDE EL COMPONENTE
        // BOARD-CONTAINER
}