import React, { Component } from "react";

type InitialState = {
  isLoggedIn: boolean;
};
export default class Ex02 extends Component<{}, InitialState> {
  state: InitialState = {
    isLoggedIn: false,
  };
  handleToggle = () => {
    this.setState((prev) => ({ isLoggedIn: !prev.isLoggedIn }));
  };
  render() {
    return (
      <div>
        <h2>
          {this.state.isLoggedIn
            ? "Xin chào, User!"
            : "Vui lòng đăng nhập để tiếp tục."}
        </h2>
        <button onClick={this.handleToggle}>
          {this.state.isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
        </button>
      </div>
    );
  }
}
