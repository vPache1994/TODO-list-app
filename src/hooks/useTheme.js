import { useState } from 'react'
import { createTheme } from '@mui/material/styles';

export const useTheme = () => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });


  const [isDark, setIsDark] = useState(false)
  
  const changeTheme = () => {

    isDark ? setIsDark(false) : setIsDark(true)
   
  }

  return {isDark, darkTheme, lightTheme, changeTheme}
}