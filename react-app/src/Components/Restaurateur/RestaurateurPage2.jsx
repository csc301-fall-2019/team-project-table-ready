import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import EmployeeListItem from "./EmployeeListItem";
import "../../Stylesheets/restaurateur_page_2.scss";
// import GeneralInfo from "./GeneralInfo";
import Employees from "./Employees";
import Pay from "./Pay";
import Menu from "./Menu";
import Navbar from "../Navbar";
import DressCode from "./DressCode";
import uid from "uid";
const queryString = require("query-string");

class RestaurateurPage2 extends Component {
  state = {
    curState: <Employees />,
    functions: [
      {
        id: 1,
        title: "Employees",
        model: <Employees />
      },
      {
        id: 2,
        title: "Dress Code",
        model: <DressCode />
      },
      {
        id: 3,
        title: "Menu",
        model: <Menu />
      },
      {
        id: 4,
        title: "Payment",
        model: <Pay />
      }
    ]
  };
  showComponent = component => {
    this.setState({
      curState: component
    });
  };

  render() {
    // console.log(this.props.location.state.restaurant_id);
    const values = queryString.parse(window);
    console.log(values);
    console.log(values.origin);
    return (
      <div>
        <Navbar />
        <div className="restaurateur-page-2">
          <div className="container">
            <div className="row">
              <div className="col-md-4 restaurant-info">
                <h2>Restaurant Info</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Name: </strong> restaurant name
                  </li>
                  <li className="list-group-item">
                    <strong>ID: </strong> 9901848184
                  </li>
                  <li className="list-group-item">
                    <strong>Address: </strong> 960 East Whitemarsh Street
                    Astoria, NY 11102
                  </li>
                  <li className="list-group-item">
                    <strong>Telephone: </strong> 123-456-7890
                  </li>
                  <li className="list-group-item">
                    <strong>Rating: </strong> 4
                  </li>
                  <li className="list-group-item">
                    <strong>Cuisine: </strong> Canadian
                  </li>
                </ul>
                <h2>Options</h2>
                <div className="list-group options">
                  {this.state.functions.map(fun => (
                    <button
                      key={uid()}
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={this.showComponent.bind(this, fun.model)}
                    >
                      {fun.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-md-8 content-display">
                {this.state.curState}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RestaurateurPage2);
