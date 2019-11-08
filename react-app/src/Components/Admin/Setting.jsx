import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";

class Setting extends Component {
    state = {};

    confirmChange = () => {
        console.log("Changes confirmed!");
    };

    render() {
        return (
            <div className='setting'>
                <div className='setting-container'>
                    <div className='row'>
                        <div className='col-sm-8 left-content'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <form>
                                        <div>
                                            <label htmlFor="formGroupExampleInput">Payment Info</label>
                                            <select className="form-control form-group">
                                                <option>EMT</option>
                                                <option>PayPal</option>
                                                <option>Visa</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="formGroupExampleInput">Example label</label>
                                            <input type="text" className="form-control" id="formGroupExampleInput"
                                                   placeholder="Example input"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="formGroupExampleInput2">Another label</label>
                                            <input type="text" className="form-control" id="formGroupExampleInput2"
                                                   placeholder="Another input"/>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-sm-6'>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="formGroupExampleInput">Example label</label>
                                            <input type="text" className="form-control" id="formGroupExampleInput"
                                                   placeholder="Example input"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="formGroupExampleInput">Example label</label>
                                            <input type="text" className="form-control" id="formGroupExampleInput"
                                                   placeholder="Example input"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="formGroupExampleInput2">Another label</label>
                                            <input type="text" className="form-control" id="formGroupExampleInput2"
                                                   placeholder="Another input"/>
                                        </div>
                                        <input className="btn btn-primary" id='confirm-button' type="submit"
                                               value="Submit"
                                               onClick={this.confirmChange}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setting;