import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
const flechHaut = require('./images/fleshhaut.png');
const flechBas = require('./images/fleshbas.png');
const flechDroite = require('./images/fleshdroite.png');
const flechGauche = require('./images/fleshgauche.png');
const cleDemmarage = require('./images/cledemarage.png');
export default class AppDragDropDemo extends Component {




    state = {
        tasks: [
            {name:"Start",category:"wip", bgcolor: cleDemmarage},
            {name:"Right", category:"wip", bgcolor:flechDroite},
            {name:"Left", category:"wip", bgcolor:flechGauche},
            {name:"Top", category:"wip", bgcolor:flechHaut},
            {name:"Bottom", category:"wip", bgcolor:flechBas}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    render() {
        var tasks = {
            wip: [],
            complete: []
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div key={t.name}
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style = {{backgroundImage: "url(" + t.bgcolor + ")"}}
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <div className="wip"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header">Deplacements</span>
                    {tasks.wip}
                </div>
                <div>
                    <div className="droppable"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">Choix</span>
                     {tasks.complete}
                </div>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">KidsCode</a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Statistiques</a></li>
              <li><a href="#">Profil</a></li>
            </ul>
          </div>
        </nav>

        <div class="container">
            <div id="phaser-example"><canvas width="800" height="600" style="display: block; touch-action: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 800px; height: 600px; cursor: inherit;"></canvas></div>





       /* <div class="cont">
        <div class="wrapper">
          <div class="box a"></div>
          <div class="box b"></div>
          <div class="box c"></div>
          <div class="box start">START</div>
          </div>
          <div class="wrapperbis">
            <div class="box z"></div>
            <div class="box e"></div>
            <div class="box z"></div>
          </div>
          <div class="wrapper">
          <div class="box a"></div>
          <div class="box b"></div>
          <div class="box c"></div>
          <div class="box a"></div>
          <div class="box a"></div>
          <div class="box end">END</div>
          </div>
        </div>*/
        </div>
      </div>



            </div>
        );
    }
}