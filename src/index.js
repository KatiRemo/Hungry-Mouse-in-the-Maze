import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Maze from './components/Maze';
import Cell from './components/Cell';
import Path from './components/Path';

const element = <Maze></Maze>

ReactDOM.render(element, document.getElementById("root"));