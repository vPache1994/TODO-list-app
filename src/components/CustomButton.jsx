import { useEffect, useState } from "react";
import Button from '@mui/material/Button';




const CustomButton = () => {

    // hook useState: Guarda una variable en un estado
    const [count, setCount] = useState(0)

    // hook useEffect: se ejecuta cada vez que se renderiza o la variable que pongas en array cambie
    useEffect(() => {

    }, [count])

    return(
        <>
            <Button variant="contained" onClick={() => setCount(count + 1)}>Incrementar</Button>
            <p>{count}</p>
        </>
        
    );
}


export default CustomButton