import { Button, Card,TextField, CircularProgress } from "@mui/material";
import { Grid } from '@mui/material';
import { useRef, useState } from "react";
import './App.css';




const App = () => {


  const addTask = () => {

    setTasks([...tasks,{title: taskField.current.value, completed: false}]) //...tasks es como poner uno por uno los elementos del array añadiendo lo de la derecha de la coma.
    //Envia un objeto con los atributos title y completed
    taskField.current.value = '' //borra el contenido del input
    //añadir tarea al estado y reiniciar ref
  }

  const addRandomTask = async () => {
    
    setIsLoading(true)
    fetch('https://dummyjson.com/todos/random')
    .then(res => res.json())
    .then(data => {
      setIsLoading(false)
      setTasks([...tasks, {title: data.todo, completed: false}])
      
    }); 

  }


  const completeTask = (task) => {
    console.log(task)
    const newTask = tasks.map((e) =>{
      //recorre el array y si coinciden los titulos, cambia el complete y se lo pasa
      return e.title === task.title ? {title: e.title, completed: true} : e

    })
    
    setTasks(newTask)

  }

  const [isLoading, setIsLoading] = useState(false)
  
  const [tasks, setTasks] = useState([
    {
      title: 'Entrenar',
      completed: false
    },
    {
      title: 'Comer una tortilla',
      completed: false
    }
    
  ])  //tareas

  const taskField = useRef('') //pilla la referencia del input



  return (
    <div className="App">

      <Card variant="outlined" className="tarjeta">
          
        <Grid rowGap={4} container spacing={1}>

          <Grid xs={12}><h1>TO-DO LIST</h1><hr/></Grid>

          <Grid xs={12}>
            {tasks.map((t) => <h2 style={t.completed ? {textDecoration: "line-through"} : null} >{t.title} {
              !t.completed?<Button onClick={() => completeTask(t)} variant="outlined">V</Button>:null}</h2>
            )}
          </Grid>     

          <Grid xs={12}>
            <hr/>
          </Grid>

          <Grid xs={8}>
            <TextField id="standard-basic" label="Add your task" variant="standard" inputRef={taskField}/>
          </Grid>
          
          <Grid xs={2}>
            <Button variant="outlined" onClick={() => addTask()}>Add a task </Button>
          </Grid>
          <Grid xs={2}>
            <Button variant="outlined" onClick={() => addRandomTask()}>Add Random &nbsp;
              {
                isLoading && <CircularProgress color="inherit" size="1rem"/>
              }
            </Button>
          </Grid>

        </Grid>
        <br/>

      </Card>

    </div>
  );
}

export default App;
