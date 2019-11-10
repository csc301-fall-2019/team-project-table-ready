import React, { Component } from "react";
import axios from "axios";
import "../../Stylesheets/restaurateur_page.scss";

class NewRestaurant extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {};
  handleSubmit(event) {
    event.preventDefault();

    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    axios
      .post(
        "/restaurant/newRestaurant",
        {
          owner: "Heddy",
          name: event.target.name.value,
          phoneNumber: event.target.phoneNumber.value,
          cuisine: event.target.cuisine.value,
          location: event.target.location.value
        },
        header
      )
      .then(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

    // fetch('http://localhost:3000/restaurant/newRestaurant', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         owner: "Heddy",
    //         name: event.target.name.value,
    //         phoneNumber: event.target.phoneNumber.value,
    //         cuisine: event.target.cuisine.value,
    //         location:event.target.location.value
    //     })
    // }).then(restaurant => {
    //     console.log("restaurant " + restaurant.name + " saved to database");
    // })
    //     .catch(err => {
    //         console.log(400);
    //     });
  }
  render() {
    return (
      <div className="new-restaurant-page">
        <div className="container">
          <div className="form-container mx-auto">
            <h2>Add A Restaurant</h2>
            <form onSubmit={this.handleSubmit} className="">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Restaurant Name*
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Restaurant Name"
                  id="name"
                  name="name"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Restaurant Telephone*
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Telephone"
                  id="phoneNumber"
                  name="phoneNumber"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Restaurant Location
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location"
                  id="location"
                  name="location"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Restaurant Cuisine
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Restaurant Cuisine"
                  id="cuisine"
                  name="cuisine"
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-primary float-right"
              >
                Create Restaurant
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewRestaurant;
