import React, { Component } from 'react'
import { thisExpression } from '@babel/types';
import Confetti from 'react-confetti'

export class TestSort extends Component {
    constructor(props){
        super(props);
        this.state = {
            lista: [],
            started: false,
            paused: false,
            finished: false,
            index: 99
        }
    }

    randomizeList = (values) => {
        let a = Math.floor(Math.random() * (values.length - 0) ) + 0;
        let b = values[a]
    
        let niz = {
          "vrednost": b,
          "splajsuj": a
        }
        return niz;
      }

    setup = () => {
        let lista = [];
        let ranLista = [];

        for (let index = 1; index <= 100; index++) {
            lista = [...lista, index]
        }
        let len = lista.length;

        for (let index = 0; index < len; index++) {
            let a = this.randomizeList(lista);
            lista.splice(a.splajsuj, 1)
            ranLista.push(a.vrednost)
        }

        console.log(ranLista)

        this.setState({
            lista: ranLista,
            finished: false,
            started: false
        })
    }

    componentDidMount(){
        this.setup();
    }

    startSort = () => {
        if ( !this.state.started ){
            this.setState({
                started: true
            })
            let i = this.state.lista.length-1;
            let flag, index;
            let lista = this.state.lista

            var sortingInterval = setInterval(() => {
                if (!this.state.paused) {
                    if (i >= 0) {
                        if (lista[i] < lista[i-1]){
                            flag = lista[i-1]
                            lista[i-1] = lista[i]
                            lista[i] = flag
                            i++;
                            index = i - 1;
                        } else {
                            i--;
                            index = i + 1;
                        }
                        this.setState({
                            lista: lista,
                            index: index
                        })
                    } else {
                        console.log("jok")
                        clearInterval(sortingInterval)
                        this.setState({
                            finished: true,
                            index: -1
                        })
                    }
                }
            }, 0.1);
        }
    }

    pauseSort = () => {
        if (this.state.paused){
            this.setState({
                paused: false
            })
        } else {
            this.setState({
                paused: true
            })
        }
    }

    render() {
        return (
            <div className="wrapper">
                 { ( this.state.finished ? <Confetti
         width={ window.innerWidth }
       height={ window.innerHeight }
          /> : "" ) }
          { (this.state.finished) ? <button className="restart--button" onClick={this.setup}>Restart</button> : <button onClick={this.startSort} className="start--button">Start</button> }
    <button className="pause--button" onClick={this.pauseSort}>{ (this.state.paused) ? ">" : "||" }</button>
                
               { this.state.lista.map(el => (
                   <div key={this.state.lista.indexOf(el)} className={"line " + (this.state.index == this.state.lista.indexOf(el) ? "current " : " ") + (this.state.lista.indexOf(el) > this.state.index ? "line--sorted" : "line--notSorted")} style={{ height: `${el}%` }}></div>
               )) }
            </div>
        )
    }
}

export default TestSort
