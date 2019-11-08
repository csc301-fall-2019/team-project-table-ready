import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";
import 'bootstrap/dist/css/bootstrap.css';

import Users from "./Users.js"
import User from "./User_temp";
class Manage extends Component {
    state = {};

    render() {
        return (

            <div className='manage'>
                <div className='manage-container'>
                    <div className='row manage-content'>
                        <div className='col-sm-8 left-content'>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Recipient's username"
                                       aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button"
                                            id="button-addon2">Search
                                    </button>
                                </div>
                            </div>
                            <div className="input-group ">
                                <Users/>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <ul className="list-group list-all">
                                <li className="list-group-item list-content">Cras justo odio</li>
                                <li className="list-group-item list-content">Cras justo odio</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Manage;