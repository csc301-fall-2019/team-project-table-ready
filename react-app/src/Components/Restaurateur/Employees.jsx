import React, { Component } from "react";
import EmployeeListItem from "./EmployeeListItem";
import { lorem, rand_string } from "../../util";
import uid from "uid";
import axios from "axios";

class Employees extends Component {
  state = {employees: []};
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
        .post(
            "/restaurant/findEmployeesByRestaurant",

            header

        )


        .then(employees =>
            this.setState({ employees: employees.data}, () =>
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
    const employees = this.state.employees;
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        const all_employees = this.state.employees;
        for (let j = 0; j < all_employees.length; j++) {
          if (all_employees[j].id === employees[i].id) {
            all_employees.splice(j, 1);
            // server call to delete comment from database required here
            break;
          }
        }
        break;
      }
    }
    this.setState({ employees: employees });
  };


  render() {
    return (
      <>
        <h2>Employees</h2>
        <div className="list-group employee-list">
          {this.state.employees.map(employee => {
            return (
              <EmployeeListItem
                key={uid(rand_string())}
                image={employee.image}
                name={employee.username}
                id={employee.id}
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
