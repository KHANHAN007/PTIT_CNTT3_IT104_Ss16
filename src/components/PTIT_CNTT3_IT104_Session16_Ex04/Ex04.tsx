import React, { Component } from 'react'


type InitialState = {
    count: number
}
export default class Ex04 extends Component<{}, InitialState> {
  state: InitialState = {
    count: 0
  };
  render() {
    return (
      <div>
        <h1>Counter: {this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}
