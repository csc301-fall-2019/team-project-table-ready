import React, { Component } from "react";
import "../../Stylesheets/signIn&Up.scss";
import Avatar from "./icon.jpg";
import Animation from "./animation.jsx";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
const log = console.log;
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSignIn(event) {
    event.preventDefault();
    const users = this.state.users;
    console.log(users);
    const user = users.filter(user => user.username === this.state.username);
    if (user.length === 0) {
      alert("this user does not exist!");
    } else if (this.state.password !== user[0].password) {
      alert("incorrect password!");
    } else {
      const userType = user[0].accountType;
      const userId = user[0]._id;
      if (userType === "SuperAdmin") {
        this.props.cookies.setCookie("cur_user", user[0], {
          path: "/",
          expires: 0
        });
        log("sign in successfully!");
        console.log(this.props.cookies.cookies);
        window.location.href = "/admin/" + userId;
      } else if (userType === "Admin") {
        this.props.cookies.setCookie("cur_user", user[0], {
          path: "/",
          expires: 0
        });
        window.location.href = "/restaurateur/" + userId;
      } else if (userType === "Employee") {
        this.props.cookies.setCookie("cur_user", user[0], {
          path: "/",
          expires: 0
        });
        window.location.href = "/employee/" + userId;
      }
    }
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  componentWillMount() {
    axios
      .get("/user/info")
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(error => {
        log(error);
      });
  }

  render() {
    if (this.props.cookies.cookies.cur_user) {
      if (this.props.cookies.cookies.cur_user.accountType === "Admin") {
        return (
          <Redirect
            to={"/restaurateur/" + this.props.cookies.cookies.cur_user._id}
          />
        );
      }
    }
    return (
      <div id="signIn-Up">
        <Navbar cookies={this.props.cookies} />
        <Animation />
        <div id="divPage">
          <div className="container">
            <img id="avatar" src={Avatar} alt="Avatar" />
            <button className="btn"> + </button>
          </div>{" "}
          <br />
          <br />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Username
              </span>
            </div>
            <input
              name="uername"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={this.handleUsername}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
            </div>
            <input
              name="password"
              type="password"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={this.handlePassword}
            />
          </div>
          <div className="input-group mb-3">
            <button
              type="button"
              className="btn btn-danger center"
              onClick={this.handleSignIn}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
