import React, { Component } from "react";

interface User {
  name: string;
  email: string;
  age: number;
  error: string;
  submitted: boolean;
}
type InitialState = {
  user: User;
};
export default class Ex05 extends Component<{}, InitialState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        age: 0,
        error: "",
        submitted: false,
      },
    };
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, age } = this.state.user;
    if (!email.includes("@")) {
      this.setState({
        user: {
          ...this.state.user,
          error: "Email không hợp lệ",
          submitted: false,
        },
      });
      return;
    }
    if (age < 0) {
      this.setState({
        user: {
          ...this.state.user,
          error: "Tuổi phải là số dương",
          submitted: false,
        },
      });
      return;
    }
    this.setState({
      user: {
        ...this.state.user,
        submitted: true,
      },
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [e.target.name]:
          e.target.name === "age"
            ? parseInt(e.target.value) || 0
            : e.target.value,
        error: "",
        submitted: false,
      },
    }));
  };

  handleReset = () => {
    this.setState({
      user: {
        name: "",
        email: "",
        age: 0,
        error: "",
        submitted: false,
      },
    });
  };

  render() {
    const { name, email, age, error, submitted } = this.state.user;
    return (
      <div>
        <h2>Nhập thông tin người dùng</h2>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Tuổi"
            value={age}
            onChange={this.handleChange}
          />
          <button type="submit">Gửi</button>
          <button type="button" onClick={this.handleReset}>
            Hủy
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {submitted && (
          <div>
            <h3>Thông tin đã gửi:</h3>
            <p>Họ tên: {name}</p>
            <p>Email: {email}</p>
            <p>Tuổi: {age}</p>
          </div>
        )}
      </div>
    );
  }
}
