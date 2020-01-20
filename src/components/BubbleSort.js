import React, { Component } from 'react'

export class BubbleSort extends Component {
    constructor(props){
        super(props);
        this.state = {
            lista: [],
            finished: false,
            started: false
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

    bubbleSort = (inputArr) => {
        let len = inputArr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len; i++) {
                if (inputArr[i] > inputArr[i + 1]) {
                    let tmp = inputArr[i];
                    inputArr[i] = inputArr[i + 1];
                    inputArr[i + 1] = tmp;
                    swapped = true;
                }
            }
        } while (swapped);
        return inputArr;
    };

    startGame = () =>{
        let lista = this.state.lista
        console.log(lista)
        this.bubbleSort(lista)
        console.log(lista)
        this.setState({
            lista: lista
        })

    }
    
    render() {
        return (
            <div className="wrapper">
                <button className="start--button" onClick={this.startGame}>Start</button>
               { this.state.lista.map(el => (
                   <div key={this.state.lista.indexOf(el)} className={"line " + (this.state.index == this.state.lista.indexOf(el) ? "current " : " ") + (this.state.lista.indexOf(el) > this.state.index ? "line--sorted" : "line--notSorted")} style={{ height: `${el}%` }}></div>
               )) }
            </div>
        )
    }
}

export default BubbleSort
