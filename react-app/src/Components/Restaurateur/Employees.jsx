import React, { Component } from "react";
import EmployeeListItem from "./EmployeeListItem";
import { lorem, rand_string } from "../../util";
import uid from "uid";
import axios from "axios";

class Employees extends Component {
  state = { employees: [] };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post("/restaurant/findEmployeesByRestaurant", header)
      .then(employees =>
        this.setState({ employees: employees.data }, () =>
          console.log("Customers fetched...", employees)
        )
      )
      .catch(err => {
        console.log(400);
      });
  }

  getEmployee = () => {
    // make server call to get all employee belonging to this restaurant
    // for now just make random info
    const employees = this.state.employees;
    for (let i = 0; i < 10; i++) {
      employees.push({
        image: "/images/avatar_sample.png",
        name: lorem.generateWords(2),
        id: rand_string(),
        telephone: rand_string()
      });
    }
    this.setState({ employees: employees });
  };

  deleteEmployee = id => {
    console.log(id);
    const employees = this.state.employees;
    for (let i = 0; i < employees.length; i++) {
      if (employees[i]._id === id) {
        employees.splice(i, 1);
        axios
          .delete(`/api/users/${id}`)
          .then(msg => {
            console.log(msg);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    this.setState({ employees: employees });
  };

  addEmployee = () => {
    const employee_username = document.getElementById("add-employee-input")
      .value;
    console.log(`employee to be added: ${employee_username}`);
  };

  render() {
    return (
      <>
        <h2>Employees</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            id="add-employee-input"
            className="form-control"
            placeholder="Employee Username"
            aria-label="Employee Username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              id="basic-addon2"
              onClick={this.addEmployee}
            >
              Add Employee
            </button>
          </div>
        </div>
        <div className="list-group employee-list">
          {this.state.employees.map(employee => {
            return (
              <EmployeeListItem
                key={uid()}
                image={employee.image}
                name={employee.username}
                id={employee._id}
                telephone={employee.tel}
                deleteEmployee={this.deleteEmployee}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default Employees;
