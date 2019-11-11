import React, { Component } from "react";
import EmployeeListItem from "./EmployeeListItem";
import { lorem, rand_string } from "../../util";
import uid from "uid";

class Employees extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      employees: [
        {
          image: "/images/avatar_sample.png",
          name: lorem.generateWords(2),
          id: rand_string(),
          telephone: rand_string()
        }
      ]
    };
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

  componentDidMount() {
    this.getEmployee();
  }

  render() {
    const employees = this.state.employees;
    return (
      <>
        <h2>Employees</h2>
        <div className="list-group employee-list">
          {employees.map(employee => {
            return (
              <EmployeeListItem
                key={uid()}
                image={"/images/avatar_sample.png"}
                name={employee.name}
                id={employee.id}
                telephone={employee.telephone}
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
