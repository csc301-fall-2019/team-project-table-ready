import {Component} from "react";
import axios from "axios";
import {
    Card, CardBody, CardHeader,
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Col,
} from "reactstrap";
import React from "react";

const log = console.log;

class AddAdmin extends Component {
    constructor(props) {
        super(props);
        // this.deleteUser = this.deleteUser.bind(this);
        // this.state = {
        //     users: [],
        //     query: this.props.query
        // };

    }

    confirm = (e) => {
        e.preventDefault();
        const new_username = document.getElementById("newUsername").value;
        const new_email = document.getElementById("newEmail").value;
        const new_password = document.getElementById("newPwd").value;
        if (new_email === '' || new_password === '' || new_username === '') {
            alert("Please fill in all fields!");
        } else {
            const new_user = {
                accountType: "SuperAdmin",
                username: new_username,
                password: new_password,
                email: new_email
            };
            console.log(new_user);

            axios
                .post('/user/signup', new_user)
                .then(res => {
                        log(res);
                        log("Successfully added new super admin!");
                    }
                )
                .catch(err => {
                    log(err);
                });
        }
    };

    render() {
        return (
            <div>
                <Col xs="12" sm="4" lg="2">
                    <Card>
                        <CardHeader>
                            Add a New Super Admin
                        </CardHeader>
                        <CardBody>
                            <Form action="">
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" id="newUsername" name="newUsername" placeholder="Username"
                                               autoComplete="name"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="email" id="newEmail" name="newEmail" placeholder="Email"
                                               autoComplete="username"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" id="newPwd" name="newPwd" placeholder="Password"
                                               autoComplete="current-password"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="form-actions">
                                    <Button type="submit" size="sm" color="primary"
                                            onClick={this.confirm}>Confirm</Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default AddAdmin;
