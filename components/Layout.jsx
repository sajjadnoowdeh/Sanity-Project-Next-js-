import React, { useContext } from "react";


import {
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { classes } from "../utils/classes";
import { Store } from "../Store/Store";
import Cookies from "js-cookie";
const Layout = ({ title = "", discription = "", children }) => {
  const {state,dispatch} = useContext(Store)
  const {darkMode} = state
  console.log('darkMode ',darkMode) 
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    }, 
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const handleChange = ()=>{
    console.log('change');
    dispatch({type:darkMode ? "DARK_MODE_OFF" : 'DARK_MODE_ON'})
    const newDarkMode  = !darkMode;
    Cookies.set('darkMode',newDarkMode ? "ON" :"OFF")
  }
  return (
    <>
      <Head>
        <title>{title ? `${title}-Sanity Website` : "Sanity Website"}</title>
        {discription && <meta name="discrption" content={discription}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
            <NextLink href={"/"} passHref>
              <Link>
                <Typography sx={classes.brand}>website</Typography>
              </Link>
            </NextLink>

            </Box>
            <Box>
              <Switch checked={darkMode}  onChange={()=>handleChange()}/>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component={"main"} sx={classes.main}>
          {children}
        </Container>
        <Box component={"footer"} sx={classes.footer}>
          <Typography>All copyRight website sanity</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
