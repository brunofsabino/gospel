
"use client"
import Image from "next/image";
import { Button, Typography, Container, ButtonProps } from '@mui/material';
import { ThemeProvider, createTheme, styled  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { purple } from '@mui/material/colors';
import Header from "@/components/header";
//import theme from './theme'; 


export default function Home() {
  
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#fff", //theme.palette.getContrastText(purple[500]),
    backgroundColor:  "#ff6b00", //purple[500],
    '&:hover': {
      backgroundColor: "#F28520",
    },
  }));
  return (
    
    <Container>
        
        <Typography variant="h1" component="h2" >
          Welcome to MUI
        </Typography>
        <ColorButton variant="contained">Custom CSS</ColorButton>
        {/* <Button sx={{backgroundColor: '#ff6b00', color: "#FFF"}}>
          Click Me
        </Button> */}
    </Container>
  );
}
