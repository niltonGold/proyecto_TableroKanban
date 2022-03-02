// Estilo de un unico componente task

// Este componente task esta siendo utilizado en el ul del componente tasks-column


// Este componente task tiene que tener principalmente 2 la informacion y el estatus
// esa informacion me vendrá por props
export default function Task(props){
    return(

        // Una task contiene lo siguiente 
                <div>
                    {/* Contiene un icono en funcion del estatus en el que esta */}
                    <i> { props.status === 'Done' ? 'Rojo' : 'Verde' } </i>

                    {/* Nombre de la tarea */}
                    <p> { props.info.name } </p>

                    {/* Icono de borrar */}
                    <i>Papelera</i>

                    {/* Un p que contiene "el id" , "create on" "fecha"*/}
                    <p> #{props.info.id} created on {props.info.creationDate.toLocaleString()} </p>
                </div>



        // el status y la info se definen en el padre que es el componente task-column
    )
}