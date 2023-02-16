import { Button, Card,TextField, CircularProgress } from "@mui/material";
import { Grid } from '@mui/material';
import { useRef, useState, useEffect } from "react";
import './App.css';




const App = () => {

  //HOOKS

  const [isLoading, setIsLoading] = useState(false)
  
  const [inputError, setInputError] = useState(false)

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tareas')) ?? [])  //tareas

  const taskField = useRef('') //pilla la referencia del input


  //cada vez que tareas cambie, guarda en memoria tareas
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tasks))
  },[tasks])

//____________________________________________________________________________________________________________


  const addTask = () => {

    if(taskField.current.value === ''){
      setInputError(true)
      return
    }

    setInputError(false)

    setTasks([...tasks,{title: taskField.current.value, completed: false, id: taskField.current.value + Math.random()}]) //...tasks es como poner uno por uno los elementos del array añadiendo lo de la derecha de la coma.
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
      setTasks([...tasks, {title: data.todo, completed: false, id: data.id}])
      
    }); 

  }


  const completeTask = (task) => {
    //console.log(task)
    const newTask = tasks.map((e) =>{
      //recorre el array y si coinciden los titulos, cambia el complete y se lo pasa
      return e.id === task.id ? {title: e.title, completed: true, id: e.id} : e

    })
    
    setTasks(newTask)

  }

  



  return (
    <div className="App">

      <Card variant="outlined" className="tarjeta">
          
        <Grid rowGap={4} container spacing={1}>

          <Grid xs={12}><h1>TO-DO LIST</h1><hr/></Grid>

          <Grid xs={12}>
            {tasks.map((t) => <h2 
            key={t.id} 
            style={t.completed ? {textDecoration: "line-through"} : null} >{t.title} {
              !t.completed?<Button onClick={() => completeTask(t)} variant="outlined">V</Button>:null}</h2>
            )}
          </Grid>     

          <Grid xs={12}>
            <hr/>
          </Grid>

          <Grid xs={8}>
            <TextField 
            id = "standard-basic" 
            label = "Add your task" 
            error = {inputError}
            helperText = {inputError ? "The task field is empty" : null}
            variant = "standard" 
            inputRef = {taskField} 
            onKeyDown = {e => e.key === 'Enter' ? addTask() : setInputError(false)}
            />
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
