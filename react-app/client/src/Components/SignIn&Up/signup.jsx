import React, {Component} from 'react';
import "../../Stylesheets/signIn&Up.scss";
import axios from 'axios';
import Navbar from "../Navbar";
import Animation from "./animation.jsx";

const log = console.log;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: "Admin",
      username: "",
      password: "",
      email: "",
      tel: "",
      confirm: "",
      Super: true
    };
    this.signUp = this.signUp.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTelChange = this.handleTelChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
  }

  handleTypeChange(event) {
    this.setState({
      accountType: event.target.value,
      Super: false
    });
  }

  handleEmailChange (event) {
    this.setState({email: event.target.value});
  }

  handleTelChange (event) {
    this.setState({tel: event.target.value});
  }

  handleUsernameChange (event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }

  handleConfirmChange (event) {
    this.setState({confirm: event.target.value});
  }

  componentWillMount() {
    axios.get('/user/info')
      .then(res => {
        log(res.data);
        this.setState({
          users: res.data
        })
      })
      .catch(error => {
        log(error);
      });
  }

  signUp(event) {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const tel = this.state.tel;
    const password = this.state.password;
    const confirm = this.state.confirm;

    if (username === "" || password === "" || tel === "" ||
      email === "" || confirm === "" ) {
      alert("All inputs must be filled in");
    } else if (password !== confirm) {
      alert("Your password doesn't match confirm");
    } else if (tel.length !== 10) {
      alert("telephone should be length of 10");
    } else if (!email.includes("@") && !email.includes(".")) {
      alert("enter proper email");
    }
    else if(password.length < 4){
      alert("Password too short, need to be at least 4 character.")
    }else {
      const users = this.state.users;
      if (users.filter(user => user.username === username).length !== 0) {
        log("Username already exists");
        alert("Username already exists, change another one");
      } else {
        axios.post('/user/signup', {
          accountType: this.state.accountType,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          tel: this.state.tel,
        }).then(response => {
          log(response.data);
        }, error => {
          log(error)
        });
        window.location.href = "/SignIn"
      }
    }
  }

  render () {
    return (
      <div id="signIn-Up">
        <Navbar cookies={this.props.cookies} />
        <Animation />
        <div id="divPage">
          <header className="center header-style">SIGN UP HERE: </header>
          <form action="" onSubmit={this.signUp}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Type
                    </span>
              </div>
              <select
                className="form-control"
                value={this.state.accountType}
                onChange={this.handleTypeChange}
              >
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Email
                    </span>
              </div>
              <input
                name="email"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange = {this.handleEmailChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Telephone
                    </span>
              </div>
              <input
                name="telephone"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange = {this.handleTelChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Username
                    </span>
              </div>
              <input
                name="uername"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange = {this.handleUsernameChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Password
                    </span>
              </div>
              <input
                name="password"
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange = {this.handlePasswordChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Confirm
                    </span>
              </div>
              <input
                name="confirm"
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange = {this.handleConfirmChange}
              />
            </div>
            <button type="submit" className="btn btn-danger center">Register</button>
          </form>
        </div>
      </div>
    )
  }

}

export default SignUp;