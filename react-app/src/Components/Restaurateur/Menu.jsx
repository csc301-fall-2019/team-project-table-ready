import React, { Component } from "react";
import MenuItem from "./MenuItem";
// import RestaurantListItem from "./RestaurantListItem";
import { Link } from "react-router-dom";

class Menu extends Component {
  state = {};
  addRow() {
    return (
      <tr>
        <th>
          <MenuItem
            name="Burger"
            image={process.env.PUBLIC_URL + "/images/menu/burger.jpg"}
          />
        </th>
        <th>
          <MenuItem
            name="Burger"
            image={process.env.PUBLIC_URL + "/images/menu/burger.jpg"}
          />
        </th>
        <th>
          <MenuItem
            name="Burger"
            image={process.env.PUBLIC_URL + "/images/menu/burger.jpg"}
          />
        </th>
      </tr>
    );
  }
  render() {
    return (
      <>
        <h2 style={{ display: "inline" }}>Your Restaurants</h2>
        <button className={"addNewButton"}>Edit</button>
        <Link to="/addNewMenuItem">
          <button className="addNewButton btn btn-outline-success btn-sm">
            {" "}
            Add New Item{" "}
          </button>
        </Link>
        <table className={"menuTable"}>
          {this.addRow()}
          {this.addRow()}
          {this.addRow()}
        </table>
      </>
    );
  }
}

export default Menu;
