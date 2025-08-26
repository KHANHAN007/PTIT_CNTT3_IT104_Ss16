import React, { Component } from "react";

type InitialState = {
  subject: string[];
};

export default class Ex01 extends Component<{}, InitialState> {
  state: InitialState = {
    subject: ["Toán", "Lý", "Hóa", "Tin học", "Văn"],
  };

  render() {
      return <div>
          <h3>Danh sách môn học</h3>
          {this.state.subject.map((item, index) =>
        <p key={index}>{item}</p>)}
    </div>;
  }
}
