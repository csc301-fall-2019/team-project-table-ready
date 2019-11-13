import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import EmployeeListItem from "./EmployeeListItem";
import "../../Stylesheets/restaurateur_page_2.scss";
// import GeneralInfo from "./GeneralInfo";
import { Redirect } from "react-router-dom";
import Employees from "./Employees";
import Pay from "./Pay";
import Menu from "./Menu";
import Navbar from "../Navbar";
import DressCode from "./DressCode";
import uid from "uid";
import axios from "axios";
import EditRestaurant from "./EditRestaurant";

const queryString = require("query-string");

class RestaurateurPage2 extends Component {
  state = {
    info: [],
    curState: <Employees res_id={this.props.match.params.id} />,
    functions: [
      {
        id: 1,
        title: "Employees",
        model: <Employees res_id={this.props.match.params.id} />
      },
      {
        id: 2,
        title: "Dress Code",
        model: <DressCode id={this.props.match.params.id} />
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

  is_authenticated = () => {
    const cur_user = this.props.cookies.cookies.cur_user;
    if (cur_user.accountType != "Employee") {
      return true;
    }
    return false;
  };

  componentDidMount() {
    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "/restaurant/findRestaurant",
        {
          _id: this.props.match.params.id
        },
        header
      )

      .then(restaurant =>
        this.setState({ info: restaurant.data[0] }, () =>
          console.log("Customers fetched...", this.state.info)
        )
      )
      .catch(err => {
        console.log(400);
      });
  }

  showComponent = component => {
    this.setState({
      curState: component
    });
  };

  render() {
    console.log(this.state.info);
    if (!this.is_authenticated()) {
      return <Redirect to="/error" />;
    }
    return (
      <div>
        <Navbar />
        <div className="restaurateur-page-2">
          <div className="container">
            <div className="row">
              <div className="col-md-4 restaurant-info">
                <button
                  className="addNewButton btn btn-outline-success btn-sm"
                  onClick={this.showComponent.bind(
                    this,
                    <EditRestaurant
                      info={this.state.info}
                      link={this.props.match.params.id}
                    />
                  )}
                >
                  {" "}
                  Edit{" "}
                </button>
                <h2>Restaurant Info</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Name: </strong> {this.state.info.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Operation Hours: </strong>{" "}
                    {this.state.info.operationHour}
                  </li>
                  <li className="list-group-item">
                    <strong>Address: </strong> {this.state.info.location}
                  </li>
                  <li className="list-group-item">
                    <strong>Telephone: </strong> {this.state.info.phoneNumber}
                  </li>
                  <li className="list-group-item">
                    <strong>Rating: </strong> {this.state.info.Rating}
                  </li>
                  <li className="list-group-item">
                    <strong>Cuisine: </strong> {this.state.info.Cuisine}
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
