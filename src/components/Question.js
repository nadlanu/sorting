import React, { Component } from 'react'

export class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            question: this.props.question
        }
    }

    answer = b => {
        if (b == this.state.question.correct_answer) {
            console.log("correct")
        } else {
            console.log("wrong")
        }
    }

    render() {
        return (
            <div className="question">
    <p>{this.state.question.category}</p>
        <p>{this.state.question.question}</p>
    <p className="difficulty">{this.state.question.difficulty}</p>
        <p>{this.state.question.correct_answer}</p>
        <div className="button--wrapper">
            <button className="btn btn-success" onClick={() => this.answer("True")}>True</button>
            <button className="btn btn-danger" onClick={() => this.answer("False")}>False</button>
        </div>
            </div>
        )
    }
}

export default Question
