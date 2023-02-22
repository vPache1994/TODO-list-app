import { Button, Card,TextField } from "@mui/material";
import { Grid } from '@mui/material';
import { useEffect } from "react";
import { useTasks } from "./hooks/useTasks"
import { useTheme } from "./hooks/useTheme"
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import CheckIcon from '@mui/icons-material/Check';

const App = () => {

  //HOOKS

 

  

  const { tasks, addRandomTask, addTask, completeTask, isLoading, taskField, inputError, setInputError } = useTasks() //importamos el custom hook
  const { isDark, darkTheme, lightTheme, changeTheme } = useTheme()

  

  //cada vez que tareas cambie, guarda en memoria tareas

  useEffect(() => {

    localStorage.setItem('tareas', JSON.stringify(tasks))

  },[tasks])

//____________________________________________________________________________________________________________


  


  return (
    <ThemeProvider theme={ isDark ? darkTheme : lightTheme }>
      <CssBaseline />
      
    
        <div className="App">

          <Card variant="outlined" className="tarjeta" sx={{p: '2rem'}}>
              
            <Grid rowGap={4} container spacing={1}>

              <Grid xs={12} align={'right'}><Button onClick = { changeTheme } endIcon={ isDark ? <LightModeIcon/> : <DarkModeIcon/>}>{isDark ? 'Go Light' : 'Go Dark'}</Button></Grid>             
              <Grid xs={12}><h1>TO-DO LIST</h1></Grid>
              <Grid xs={12} sx={{ borderBottom: 1 }}></Grid>
              <Grid xs={12}>
                {tasks.map((t) => <h2 
                key={t.id} 
                style={t.completed ? {textDecoration: "line-through"} : null} >{t.title} {
                  !t.completed?<Button onClick={() => completeTask(t)} variant="outlined"><CheckIcon/></Button>:null}</h2>
                )}
              </Grid>     

              <Grid xs={12} sx={{ borderBottom: 1 } }></Grid>

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
                <Button variant="outlined" onClick={() => addTask()} endIcon={<AddIcon/>}>Add a task </Button>
              </Grid>
              <Grid xs={2}>
                <LoadingButton variant="outlined" onClick={() => addRandomTask()} loading={isLoading} endIcon={<LowPriorityIcon/>}>Add Random &nbsp;
                </LoadingButton>
              </Grid>

            </Grid>
            <br/>

          </Card>

        </div>
     </ThemeProvider>
    );
    
}

export default App;
