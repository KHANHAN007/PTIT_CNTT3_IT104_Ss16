import React, { Component } from 'react'

type InitialState = {
    isDarkMode: boolean;
};
export default class Ex06 extends Component<{}, InitialState> {
  constructor(props: {}) {
    super(props);
    this.state = {
        isDarkMode: false,
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => ({
        isDarkMode: !prevState.isDarkMode,
    }));
  };

    render() {
        const { isDarkMode } = this.state;
        const backgroundColor = isDarkMode ? '#333' : '#fff';
        const textColor = isDarkMode ? '#fff' : '#000';
    return (
      <div style={{ backgroundColor, color: textColor , height:"100vh"}}>
        <h2>Chế độ {this.state.isDarkMode ? "Tối" : "Sáng"} đã bật</h2>
        <button onClick={this.toggleDarkMode}>
          Chuyển sang chế độ {this.state.isDarkMode ? "Sáng" : "Tối"}
        </button>
      </div>
    )
  }
}
