import { Button, Card,TextField } from "@mui/material";
import { Grid } from '@mui/material';
import { useRef, useState } from "react";
import './App.css';




const App = () => {


  const addTask = () => {

    setTasks([...tasks, taskField.current.value]) //...tasks es como poner uno por uno los elementos del array añadiendo lo de la derecha de la coma
    taskField.current.value = '' //borra el contenido del input
    //añadir tarea al estado y reiniciar ref
  }

  const [tasks, setTasks] = useState(['Ponerme mazas','Aprender react'])  //tareas

  const taskField = useRef('') //pilla la referencia del input


  return (
    <div className="App">

      <Card variant="outlined" className="tarjeta">
          
        <Grid rowGap={4} container spacing={1}>

          <Grid xs={12}><h1>TO-DO LIST</h1><hr/></Grid>

          <Grid xs={12}>
            {tasks.map((t) => <h2>{t}</h2>)}
          </Grid>     

          <Grid xs={12}>
            <hr/>
          </Grid>

          <Grid xs={8}>
            <TextField id="standard-basic" label="Add your task" variant="standard" inputRef={taskField}/>
          </Grid>
          
          <Grid xs={4}>
            <Button variant="outlined" onClick={() => addTask()}>Add a task</Button>
          </Grid>

        </Grid>
        <br/>

      </Card>

    </div>
  );
}

export default App;
