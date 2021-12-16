import React from 'react';
import { Grid, Paper, Box, makeStyles } from '@material-ui/core';
import '../index.css';

const styles1 = {
    paper: {
      background: "#77DD77",
    }
};
  
const styles2 = {
    paper: {
      background: "#EA3C53",
    }
};

const useStyles1 = makeStyles(styles1);
const useStyles2 = makeStyles(styles2);

function Cell(props) { 
    if(props.N == 0) {
      return(<RedCell></RedCell>);      
    }
  
    else if(props.N == 1) {
      return(<GreenCell></GreenCell>)
    }
  
    else {
      return(<WhiteCell></WhiteCell>);
    }      
}
  
function WhiteCell() {
  return (
    <Grid item>
    <Paper elevation={3}>
      <Box padding={2} height={30} width = {30} >              
                  
      </Box>
    </Paper> 
    </Grid>    
    );
}
  
function RedCell() {
  const classes = useStyles2();
      return (
          <Grid item>
          <Paper className={classes.paper} elevation={3}>
            <Box padding={2} height={30} width = {30} >                       
            </Box>
          </Paper> 
          </Grid>    
      );
}
  
function GreenCell() {
    const classes = useStyles1();
        return (
            <Grid item>
            <Paper className={classes.paper} elevation={3}>
              <Box padding={2} height={30} width = {30} >                    
              </Box>
            </Paper> 
            </Grid>    
        );
}

export default Cell;