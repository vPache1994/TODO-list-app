import { useState, useRef } from 'react'

export const useTasks = () => {

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tareas')) ?? [])  //tareas
    const [isLoading, setIsLoading] = useState(false)
    const taskField = useRef('') //pilla la referencia del input
    const [inputError, setInputError] = useState(false)

    


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

    return {tasks, addTask, completeTask, addRandomTask, isLoading, inputError, setInputError, taskField}

}

