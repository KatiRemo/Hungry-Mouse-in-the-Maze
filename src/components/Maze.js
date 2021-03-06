import React from "react";
import ReactDOM from "react-dom";
import { Button, Grid, Box, Paper } from "@material-ui/core";
import Cell from "./Cell";
import Path from "./Path";
import mouse from './assets/mouse.png';
import queso from "./assets/queso.png";
import "../index.css";

class Maze extends React.Component {
  matrix = [2];
  paths = [];
  idx = 0;
  numPaths = 0;
  pathIdx = 0;

  index = () => {
    this.idx += 1;
    return this.matrix[this.idx];
  };

  findColor = (path) => {
    this.pathIdx += 1;
    let result = path[this.pathIdx];
    if (this.pathIdx === 14) {
      this.pathIdx = 0;
    }
    return result;
  };

  generateMatrix = () => {
    for (let i = 0; i < 14; i++) {
      let val = Math.floor(Math.random() * 4);
      if (val === 0) {
        this.matrix.push(0);
      } else {
        this.matrix.push(2);
      }
    }
    this.matrix.push(2);
  };

  inMaze = (x, y, visited) => {
    return (
      x >= 0 &&
      x < 4 &&
      y >= 0 &&
      y < 4 &&
      this.matrix[x * 4 + y] > 0 &&
      visited[x * 4 + y] === 0
    );
  };

  calculatePaths = () => {
    let visited = [];
    for (let i = 0; i < 16; i++) {
      visited[i] = 0;
    }

    this.mazeUtil(visited, 0, 0, []);
    console.log(this.numPaths);
    console.log(this.paths);
    return this.paths;
  };

  mazeUtil = (visited, x, y, currentPath) => {
    if (x === 3 && y === 3) {
      this.numPaths += 1;
      this.paths.push([...currentPath]);
      visited[15] = 0;
      return;
    }

    if (!this.inMaze(x, y, visited)) {
      return;
    }

    visited[4 * x + y] = 1;

    currentPath.push([x + 1, y]);
    this.mazeUtil(visited, x + 1, y, currentPath);
    currentPath.pop();

    currentPath.push([x, y + 1]);
    this.mazeUtil(visited, x, y + 1, currentPath);
    currentPath.pop();

    visited[4 * x + y] = 0;
    return;
  };

  getNumPaths = () => {
    return (
      <div style = {{ color: "white" }}>
        <center>
          <b><h3>Total Paths = {this.numPaths} </h3></b>{" "}
        </center>
      </div>
    );
  };

  findPaths = () => {
    const displayNumPaths = <this.getNumPaths></this.getNumPaths>;
    ReactDOM.render(displayNumPaths, document.getElementById("count"));
    let grids = document.getElementById("routes");

    for (let i = 0; i < this.paths.length; i++) {
      const solution = (
        <Path currentPath = {this.paths[i]} maze = {this.matrix}></Path>
      );
      const id = Math.random();
      const d = document.createElement("span");
      d.id = id;
      const space = document.createElement("br");
      grids.appendChild(d);
      grids.appendChild(space);
      ReactDOM.render(solution, document.getElementById(id));
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    window.location.reload(false);
    console.log("The link was clicked.");
  };

  render() {
    this.matrix = new Array([]);
    this.matrix = [2];
    this.generateMatrix();
    this.calculatePaths();

    return (
      <span className = "maze">
        <center>
          <h1>Hungry Mouse in the Maze</h1>
        </center>
        <Grid container spacing = {2} justify = "center" direction = "column">
          <p>
            <Grid container spacing = {1} justify = "center" direction = "row">
              <Grid item>
                <Paper elevation = {3}>
                  <Box padding = {2} height = {35} width = {35}>
                    <center>
                      <img
                        src = {mouse}
                        height = {50}
                        width = {50}
                        vertical-align = "middle"
                        alt="mouse"
                      ></img>
                    </center>
                  </Box>
                </Paper>
              </Grid>
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
            </Grid>
          </p>
          <p>
            <Grid container spacing = {1} justify = "center" direction = "row">
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
            </Grid>
          </p>
          <p>
            <Grid container spacing = {1} justify = "center" direction = "row">
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
            </Grid>
          </p>
          <p>
            <Grid container spacing = {1} justify = "center" direction = "row">
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
              <Cell N = {this.index()}></Cell>
              <Grid item>
                <Paper elevation={3}>
                  <Box padding = {2} height = {35} width = {35}>
                    <center>
                      <img
                        src = {queso}
                        height = {50}
                        width = {50}
                        vertical-align = "middle"
                        alt="cheese"
                      ></img>
                    </center>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </p>
          <div>
            <center>
              <Button className = "button"
                onClick = {this.handleClick}
                style = {{
                  margin: 12,
                  padding: 6,
                }}
              >
                <b>New maze</b>
              </Button>
              <Button className = "button"
                onClick = {this.findPaths}
                style = {{
                  margin: 12,
                  padding: 6,
                }}
              >
                <b> Find Paths </b>
              </Button>
            </center>
          </div>
        </Grid>
      </span>
    );
  }
}

export default Maze;