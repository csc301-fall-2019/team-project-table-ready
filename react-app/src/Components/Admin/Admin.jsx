import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";


class Admin extends Component {
  state = {};

  chooseOverview = () => {

  };

  chooseManage = () => {

  };

  chooseSetting = () => {

  };

  showContent = () => {

  };

  render() {
    return (
      <div className='admin-page'>
        <div className="row menu-bar">
          <div className="col-sm-8 menu">
            <div className="btn-group btn-group-lg button-group" role="group" aria-label="Large button group">
              <button type="button" className="btn btn-secondary btn-danger btn-outline-dark menu-button"
                      onClick={this.chooseOverview}>Overview
              </button>
              <button type="button" className="btn btn-secondary btn-danger btn-outline-dark menu-button"
                      onClick={this.chooseManage}>Manage
              </button>
              <button type="button" className="btn btn-secondary btn-danger btn-outline-dark menu-button"
                      onClick={this.chooseSetting}>Setting
              </button>
            </div>
          </div>
          <div className="col-sm-4 profile">
            <div className="user-info">
              <div className="row">
                <div className="">
                  <img className="avatar" src='../../../images/avatar_sample.png' alt=""/>
                  <strong>Welcome, Juliet!</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-content">{this.showContent}</div>
      </div>
    );
  }

}

export default Admin;