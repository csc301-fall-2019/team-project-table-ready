import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";

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
                            <div className="input-group mb-3 the-list">
                                <ul className="list-group list-all">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" aria-label="Radio button for following text input"/>
                                        </div>
                                        <li className="list-group-item list-content">Cras justo odio</li>
                                    </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" aria-label="Radio button for following text input"/>
                                        </div>
                                        <li className="list-group-item active list-content">Cras justo odio</li>
                                    </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" aria-label="Radio button for following text input"/>
                                        </div>
                                        <li className="list-group-item list-content">Cras justo odio</li>
                                    </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" aria-label="Radio button for following text input"/>
                                        </div>
                                        <li className="list-group-item list-content">Cras justo odio</li>
                                    </div>
                                </ul>
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