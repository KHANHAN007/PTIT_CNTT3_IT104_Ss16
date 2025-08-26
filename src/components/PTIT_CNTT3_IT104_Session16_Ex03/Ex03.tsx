import React, { Component } from "react";

interface ButtonStyle {
  color?: string;
  backgroundColor: string;
  padding: string;
  border: string;
  borderRadius: string;
}

type InitialState = {
  a: ButtonStyle[];
};
export default class Ex03 extends Component<{}, InitialState> {
  state: InitialState = {
    a: [
      {
        color: "white",
        backgroundColor: "red",
        padding: "12px",
        border: "1px solid black",
        borderRadius: "5px",
      },
      {
        color: "white",
        backgroundColor: "blue",
        padding: "12px",
        border: "1px solid black",
        borderRadius: "5px",
      },
      {
        color: "white",
        backgroundColor: "green",
        padding: "12px",
        border: "1px solid black",
        borderRadius: "5px",
      },
      {
        color: "black",
        backgroundColor: "yellow",
        padding: "12px",
        border: "1px solid black",
        borderRadius: "5px",
      },
    ],
  };
  render() {
    return (
      <div>
        {this.state.a.map((item, index) => (
          <button key={index} style={{ ...item, margin: "5px" }}>
            {item.color}
          </button>
        ))}
      </div>
    );
  }
}
