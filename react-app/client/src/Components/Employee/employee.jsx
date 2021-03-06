import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withStyles, ThemeProvider} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import './employee.css';
import Card from 'react-bootstrap/Card';
import Navbar from '../Navbar.jsx';
import Checkbox from '@material-ui/core/Checkbox';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import {DatePicker} from '@y0c/react-datepicker';
import {slide as Menu} from 'react-burger-menu';
import all_table from './dummy_table_data';
import Draggable, {DraggableCore} from 'react-draggable';
import {withRouter} from 'react-router-dom';
import VerticalModal from './verticalModal';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {Redirect} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import {connect} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faBan, faUser, faCalendarAlt, faClock, faConciergeBell} from '@fortawesome/free-solid-svg-icons';

const dayjs = require('dayjs');
// fake data generator

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

var edgeSize = 100;
var timer = null;

function handleMousemove(event) {
    // NOTE: Much of the information here, with regard to document dimensions,
    // viewport dimensions, and window scrolling is derived from JavaScript.info.
    // I am consuming it here primarily as NOTE TO SELF.
    // --
    // Read More: https://javascript.info/size-and-scroll-window
    // --
    // CAUTION: The viewport and document dimensions can all be CACHED and then
    // recalculated on window-resize events (for the most part). I am keeping it
    // all here in the mousemove event handler to remove as many of the moving
    // parts as possible and keep the demo as simple as possible.
    // Get the viewport-relative coordinates of the mousemove event.
    var viewportX = event.clientX;
    var viewportY = event.clientY;
    // Get the viewport dimensions.
    var viewportWidth = document.documentElement.clientWidth;
    var viewportHeight = document.documentElement.clientHeight;
    // Next, we need to determine if the mouse is within the "edge" of the
    // viewport, which may require scrolling the window. To do this, we need to
    // calculate the boundaries of the edge in the viewport (these coordinates
    // are relative to the viewport grid system).
    var edgeTop = edgeSize;
    var edgeLeft = edgeSize;
    var edgeBottom = viewportHeight - edgeSize;
    var edgeRight = viewportWidth - edgeSize;
    var isInLeftEdge = viewportX < edgeLeft;
    var isInRightEdge = viewportX > edgeRight;
    var isInTopEdge = viewportY < edgeTop;
    var isInBottomEdge = viewportY > edgeBottom;
    // If the mouse is not in the viewport edge, there's no need to calculate
    // anything else.
    if (!(isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge)) {
        clearTimeout(timer);
        return;
    }
    // If we made it this far, the user's mouse is located within the edge of the
    // viewport. As such, we need to check to see if scrolling needs to be done.
    // Get the document dimensions.
    // --
    // NOTE: The various property reads here are for cross-browser compatibility
    // as outlined in the JavaScript.info site (link provided above).
    var documentWidth = Math.max(
        document.body.scrollWidth,
        document.body.offsetWidth,
        document.body.clientWidth,
        document.documentElement.scrollWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
    var documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.body.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
    // Calculate the maximum scroll offset in each direction. Since you can only
    // scroll the overflow portion of the document, the maximum represents the
    // length of the document that is NOT in the viewport.
    var maxScrollX = documentWidth - viewportWidth;
    var maxScrollY = documentHeight - viewportHeight;
    // As we examine the mousemove event, we want to adjust the window scroll in
    // immediate response to the event; but, we also want to continue adjusting
    // the window scroll if the user rests their mouse in the edge boundary. To
    // do this, we'll invoke the adjustment logic immediately. Then, we'll setup
    // a timer that continues to invoke the adjustment logic while the window can
    // still be scrolled in a particular direction.
    // --
    // NOTE: There are probably better ways to handle the ongoing animation
    // check. But, the point of this demo is really about the math logic, not so
    // much about the interval logic.
    (function checkForWindowScroll() {
        clearTimeout(timer);
        if (adjustWindowScroll()) {
            timer = setTimeout(checkForWindowScroll, 30);
        }
    })();
    // Adjust the window scroll based on the user's mouse position. Returns True
    // or False depending on whether or not the window scroll was changed.
    function adjustWindowScroll(insta) {
        // Get the current scroll position of the document.
        var currentScrollX = window.pageXOffset;
        var currentScrollY = window.pageYOffset;
        // Determine if the window can be scrolled in any particular direction.
        var canScrollUp = currentScrollY > 0;
        var canScrollDown = currentScrollY < maxScrollY;
        var canScrollLeft = currentScrollX > 0;
        var canScrollRight = currentScrollX < maxScrollX;
        // Since we can potentially scroll in two directions at the same time,
        // let's keep track of the next scroll, starting with the current scroll.
        // Each of these values can then be adjusted independently in the logic
        // below.
        var nextScrollX = currentScrollX;
        var nextScrollY = currentScrollY;
        // As we examine the mouse position within the edge, we want to make the
        // incremental scroll changes more "intense" the closer that the user
        // gets the viewport edge. As such, we'll calculate the percentage that
        // the user has made it "through the edge" when calculating the delta.
        // Then, that use that percentage to back-off from the "max" step value.
        var maxStep = 50;
        // Should we scroll left?
        if (isInLeftEdge && canScrollLeft) {
            var intensity = (edgeLeft - viewportX) / edgeSize;
            nextScrollX = nextScrollX - maxStep * intensity;
            // Should we scroll right?
        } else if (isInRightEdge && canScrollRight) {
            var intensity = (viewportX - edgeRight) / edgeSize;
            nextScrollX = nextScrollX + maxStep * intensity;
        }
        // Should we scroll up?
        if (isInTopEdge && canScrollUp) {
            var intensity = (edgeTop - viewportY) / edgeSize;
            nextScrollY = nextScrollY - maxStep * intensity;
            // Should we scroll down?
        } else if (isInBottomEdge && canScrollDown) {
            var intensity = (viewportY - edgeBottom) / edgeSize;
            nextScrollY = nextScrollY + maxStep * intensity;
        }
        // Sanitize invalid maximums. An invalid scroll offset won't break the
        // subsequent .scrollTo() call; however, it will make it harder to
        // determine if the .scrollTo() method should have been called in the
        // first place.
        nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX));
        nextScrollY = Math.max(0, Math.min(maxScrollY, nextScrollY));
        if (nextScrollX !== currentScrollX || nextScrollY !== currentScrollY) {
            insta.scrollTo(nextScrollX, nextScrollY);
            return true;
        } else {
            return false;
        }
    }
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600]
        }
    },
    checked: {}
})(props => <Checkbox color="default" {...props} />);

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#e6e6e6',

    // styles we need to apply on draggables
    ...draggableStyle
});
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid
});

const initial_color = (() => {
    let tmp = [];
    for (let i = 0; i < all_table.tables.length; i++) {
        tmp.push('#f8f9fa');
    }
    return tmp;
})();

class Employee extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            all_seats: [],
            items: [],
            to_be_reserved: [],
            checkedG: false,
            current_date: dayjs().format('YYYY/MM/DD'),
            draggin: false,
            menu_open: false,
            all_table: [],
            reservations_color: initial_color,
            user_obj: 0,
            changed: false,
            employee_obj: null,
            rest_obj: null,
            modal_show: false,
            loading: true,
            valid: false
        };
        console.log(this.state);
    }

    tokenConfig = () => {
        const token = this.props.auth.token;
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    };

    componentDidMount() {
        const date = new Date()
        this.setState({
            current_date: date.getFullYear()+"/"+(date.getMonth()+1).toString(10)+"/"+date.getDate()
        })
        console.log(this.state.current_date)
        axios.get(`/api/users/get/${this.props.match.params.id}`).then(user => {
            console.log(user);

            this.setState({loading: false, validate_user: user.data[0]});
            this.setState({valid: true, employee_obj: this.state.validate_user});
            if (this.state.validate_user.workFor !== "") {
                this.update_rest_waitlist(this.state.validate_user.workFor);
                this.get_table(this.state.validate_user.workFor);
            }
        });
    }

    remove_from_reserved = index => {
        this.setState({
            //TODO: Backend handle
            to_be_reserved: this.state.to_be_reserved.filter(
                i => i.id !== this.state.to_be_reserved[index].id
            )
        });
    };
    remove_reservation_from_items = index => {
        this.delete_data(this.state.items[index]);
        this.setState({
            items: this.state.items.filter(i => i.id !== this.state.items[index].id)
        });
    };

    create_waitlist = (new_wl) => {
        const header = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        let id;
        axios.post('/waitlist/newWaitlist', {
            id: new_wl.id,
            name: new_wl.name,
            people: new_wl.people,
            type: new_wl.type,
            date_of_arrival: new_wl.date_of_arrival,
            estimated_time: new_wl.estimated_time
        }, header)
            .then((response) => {
                id = response.data;
                console.log(response.data);
                axios.post('/restaurant/updateReservation', {
                    _id: this.state.rest_obj._id,
                    reservations: [...this.state.rest_obj.reservations, id]
                })
                    .then(res => {this.update_rest_waitlist(this.state.employee_obj.workFor)})
                    .catch(function (error) {
                        console.log(error);
                    });

            })
            .catch(error => {
                console.log(error);
            });
    };
    create_table = (capacity) => {
        axios.post("/waitlist/CreateNewTable", {
            rest_id: this.state.employee_obj.workFor,
            table_occupied: false,
            table_capacity: capacity
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    modify_table = (table, status) => {
        axios.put("/waitlist/ModifyTableStatus", {
            id: table._id,
            status: status
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    get_table = (rest_id) => {
        axios.post("/waitlist/GetTableForRestaurant", {
            rest_id: rest_id
        })
            .then(res => {
                console.log(res.data);
                this.state.all_table = res.data;
                this.setReservationColor();
            })

            .catch(err => console.log(err));
    };
    update_rest_waitlist = (rest_id) => {
        this.setState({
            to_be_reserved: []
        });
        axios.post("/api/restaurants/findRestaurant", {_id: rest_id})
            .then(res => {
                this.setState({rest_obj: res.data[1][0]});
                this.setState({all_seats: res.data[0]});
                if (this.state.current_date != null) {
                    this.setState({
                        items: this.state.all_seats.filter(value => value.date_of_arrival === this.state.current_date)
                    });
                }
            });
    };
    delete_data = (data) => {
        const header = {
            headers: {
                Accept: 'application/text',
                'Content-Type': 'application/text'
            }
        };
        console.log(this.state.to_be_reserved);
        console.log(data._id);
        let in_list = false;
        this.state.to_be_reserved = this.state.to_be_reserved.filter(
            value => value != null
        );
        this.state.to_be_reserved.forEach(element => {
            if (element._id === data._id) {
                in_list = true;
            }
        });
        if (in_list) {
            console.log('hi');
            this.state.to_be_reserved = this.state.to_be_reserved.filter(
                value => value._id !== data._id
            );
        }
        console.log(this.state.to_be_reserved);
        axios.delete('/api/removeWaitlist/' + data._id).then(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
        this.state.rest_obj.reservations = this.state.rest_obj.reservations.filter(
            value => value !== data._id
        );
        axios
            .post('/restaurant/updateReservation', {
                _id: this.state.rest_obj._id,
                reservations: this.state.rest_obj.reservations
            })
            .then(response => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    update_data = data => {
        const header = {
            headers: {
                Accept: 'application/text',
                'Content-Type': 'application/text'
            }
        };
        axios
            .post('/updateWaitlistStatus', {
                _id: data._id,
                reserved: data.reserved
            })
            .then(
                response => {
                    console.log(response);
                },
                error => {
                    console.log(error);
                }
            );
    };

    handleChange = () => {
        this.setState({checkedG: !this.state.checkedG});
    };
    handleStart = item => {
        this.setState({user_obj: item});
        this.setState({draggin: true});
    };
    handleStop = index => {
        this.setOccupied();
        const i = this.state.items.indexOf(this.state.to_be_reserved[index]);

        if (this.state.changed) {
            this.state.items[i].reserved = true;
            this.update_data(this.state.items[i]);
            let tmp = [];
            this.state.to_be_reserved.forEach(item => {
                if (item === this.state.user_obj) {
                    tmp.push(null);
                } else {
                    tmp.push(item);
                }
            });
            this.setState({
                to_be_reserved: tmp
            });
        }

        this.setState({
            changed: false,
            draggin: false
        });
    };
    setOccupied = () => {
        for (let i = 0; i < this.state.reservations_color.length; i++) {
            if (this.state.reservations_color[i] === 'green') {
                this.state.all_table[i].table_occupied = true;
                this.modify_table(this.state.all_table[i], true);
            }
        }
    };
    setReservationColor = () => {
        let tmp = this.state.reservations_color;
        for (let i = 0; i < this.state.all_table.length; i++) {
            if (this.state.all_table[i].table_occupied === true) {
                tmp[i] = 'green';
            }
        }
        console.log(tmp);
        this.setState({
            reservations_color: tmp
        });
    };
    change_menu_state = (value, index) => {
        this.setState({menu_open: !this.state.menu_open});
        let in_list = false;
        this.state.to_be_reserved.forEach(element => {
            if (element === value) {
                in_list = true;
            }
        });
        this.get_table(this.state.validate_user.workFor);
        if (in_list === false) {
            this.state.to_be_reserved = this.state.to_be_reserved.filter((value) => value != null);
            this.setState({to_be_reserved: [...this.state.to_be_reserved, value]});
        }
        console.log(this.state.to_be_reserved);
    };
    remove_reservation_from_items = index => {
        this.delete_data(this.state.items[index]);
        this.setState({
            items: this.state.items.filter(i => i.id !== this.state.items[index].id)
        });
    };
    removefocus = e => {
        e.preventDefault();
    };
    /* change color of card */

    checkcapacity = index => {
        // const cur_table = document.getElementById(`Table-${index}`)
        // this.setState({current_table:cur_table})
        const cur_table_obj = this.state.all_table[index];
        if (this.state.draggin) {
            if (
                cur_table_obj.table_capacity >= this.state.user_obj.people &&
                cur_table_obj.table_occupied === false
            ) {
                this.state.reservations_color[index] = 'green';
                this.setState({
                    reservations_color: this.state.reservations_color,
                    changed: true
                });
            } else if (cur_table_obj.table_occupied === false) {
                this.state.reservations_color[index] = 'red';
                this.setState({
                    reservations_color: this.state.reservations_color,
                    changed: false
                });
            }
        }
    };
    resumecard = index => {
        if (this.state.all_table[index].table_occupied === false) {
            this.state.reservations_color[index] = '#f8f9fa';
            this.setState({
                reservations_color: this.state.reservations_color,
                changed: false
            });
        }
    };
    showdate = value => {
        const year = value.$y;
        const month = value.$M + 1;
        const day = value.$D;
        const date = `${year}/${month}/${day}`;
        this.setState({current_date: date});
    };
    handleStateChange = state => {
        this.setState({menu_open: state.isOpen});
    };
    handleMouseOver = index => {
        if (this.state.draggin) {
            this.checkcapacity(index);
        }
    };
    empty_seats = index => {
        if (this.state.all_table[index].table_occupied === true) {
            this.state.all_table[index].table_occupied = false;
            this.resumecard(index);
            this.modify_table(this.state.all_table[index], false);
        }
    };
    remove_from_reserved = index => {
        this.state.to_be_reserved = this.state.to_be_reserved.filter((value) => value != null);
        this.setState({
            //TODO: Backend handle
            to_be_reserved: this.state.to_be_reserved.filter(
                i => i.id !== this.state.to_be_reserved[index].id
            )
        });
    };
    setModalState = state => {
        this.setState({
            modal_show: state
        });
    };
    add_reservation = (name, ppl_num, date, time, type) => {
        const new_wl = {
            id: Math.random()
                .toString(36)
                .substr(2, 9),
            name: name,
            people: ppl_num,
            type: type,
            date_of_arrival: date,
            estimated_time: time
        };
        if (name === null || name === '') {
            alert('Name requires');
        } else if (Number.isInteger(ppl_num) === false) {
            alert('Number of people needs to be a number');
        } else if (date === null || date === '') {
            alert('You need to select a date');
        } else if (time === null || time === '') {
            alert('Time requires');
        } else if(type === null){
            alert('Type requires')
        } else {
            this.setModalState(false);
            this.create_waitlist(new_wl);
        }
        this.update_rest_waitlist(this.state.validate_user.workFor);
    };
    render_button = (value, index) => {
        if (this.state.items[index].reserved) {
            return null;
        } else {
            return (
                <button
                    className="accept-button"
                    onClick={e => this.change_menu_state(value, index)}
                    onMouseDown={this.removefocus}
                >
                    <img
                        src={
                            process.env.PUBLIC_URL + '/images/restaurant_images/done-tick.png'
                        }
                    ></img>
                </button>
            );
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        if (!this.state.loading) {
            if (!this.props.isAuthenticated) {
                console.log(
                    'redirecting to signin since not authenticated in employee page'
                );
                return <Redirect to="/SignIn"/>;
            } else {
                if (this.props.current_user.accountType !== "SuperAdmin" && this.state.validate_user.workFor === "") {
                    console.log(this.props.current_user.accountType);
                    return <Redirect to={`/userpage/${this.props.match.params.id}`}/>;
                }
            }
            let draggables = [];
            this.state.to_be_reserved.forEach((item, index) => {
                if (item != null) {
                    draggables.push(
                        <Draggable
                            onStart={() => this.handleStart(item)}
                            onStop={() => this.handleStop(index)}
                        >
                            <Card
                                id={`usercard-${index}`}
                                draggable="true"
                                style={{backgroundColor: '#f8f9fa', width: '18rem'}}
                            >
                                <Card.Header className="header-of-card">
                                    <div className="pic-container">
                                        <strong>{item.name}</strong>
                                        <img
                                            className="user-pic"
                                            src={
                                                process.env.PUBLIC_URL +
                                                '/images/restaurant_images/boy.png'
                                            }
                                        ></img>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                    <span>
                      <img
                          className="info-png"
                          src={
                              process.env.PUBLIC_URL +
                              '/images/restaurant_images/calendar.png'
                          }
                      ></img>
                      <span className="reservation_time">
                        {item.estimated_time}
                      </span>
                      <span className="reservation_date">
                        /{item.date_of_arrival}
                      </span>
                    </span>
                                    </div>
                                    <div className="num_people">
                    <span>
                      <img
                          className="info-png"
                          src={
                              process.env.PUBLIC_URL +
                              '/images/restaurant_images/avatar.png'
                          }
                      ></img>
                      <span className="attendence">{item.people}</span>
                    </span>
                                    </div>
                                    <div className="user_profile_holder">
                                        <div className="check-container">
                                            <button
                                                className="reject-button"
                                                onClick={e => this.remove_from_reserved(index)}
                                                onMouseDown={this.removefocus}
                                            >
                                                <img
                                                    src={
                                                        process.env.PUBLIC_URL +
                                                        '/images/restaurant_images/no-stopping.png'
                                                    }
                                                ></img>
                                            </button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Draggable>
                    );
                } else {
                    draggables.push(null);
                }
            });
            return (
                <div id="outer-container" className="card-container">
                    <Menu
                        pageWrapId={'page-wrap'}
                        width={'100%'}
                        outerContainerId={'outer-container'}
                        right
                        disableAutoFocus
                        customBurgerIcon={false}
                        isOpen={this.state.menu_open}
                        onStateChange={state => this.handleStateChange(state)}
                        handleMousemove={() => handleMousemove(this)}
                    >
                        <h2 style={{display: 'inline'}}>Manage Guests Seating</h2>
                        <p>Drag and drop groups of guests to tables of appropriate capacity!</p>
                        <span id="reservation_container" onMouseDown={this.removefocus}>
                {draggables.map((item, index) => (
                    //Fix bug
                    <div key={index}>{item}</div>
                ))}
              </span>
                        <span
                            id="avaliable_seats_container"
                            onMouseDown={this.removefocus}
                        >
                {this.state.all_table.map((item, index) => (
                    <Card
                        key={index}
                        id={`Table-${index}`}
                        className="tablecard"
                        style={{
                            backgroundColor: this.state.reservations_color[index],
                            width: '18rem'
                        }}
                        onMouseOver={e => this.handleMouseOver(index)}
                        onMouseLeave={() => this.resumecard(index)}
                    >
                        <Card.Header className="header-of-card">
                            <div className="pic-container">
                                <strong>{`Table-${index + 1}`}</strong>
                                <img
                                    className="user-pic"
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/images/restaurant_images/table.png'
                                    }
                                ></img>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                <span>Capacity: {item.table_capacity}</span>
                            </div>
                            <div className="user_profile_holder">
                                <div className="check-container">
                                    <button
                                        className="reject-button"
                                        onClick={e => this.empty_seats(index)}
                                        onMouseDown={this.removefocus}
                                    >
                                        <img
                                            src={
                                                process.env.PUBLIC_URL +
                                                '/images/restaurant_images/no-stopping.png'
                                            }
                                        ></img>
                                    </button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
              </span>
                    </Menu>
                    <div id="page-wrap">
                        <Navbar profile_link={`/userpage/${this.props.match.params.id}`}/>
                        <h5>Welcome! Click <FontAwesomeIcon icon={faCheck}/> to sit a group of guests
                            and <FontAwesomeIcon icon={faBan}/> to remove guests.</h5>
                        <div id="cal" style={{height: '80px'}}>
                            <DatePicker onChange={
                                (value) => {
                                    this.showdate(value);
                                    this.update_rest_waitlist(this.state.validate_user.workFor);
                                }
                            } showDefaultIcon
                                        initialDate={dayjs().format('YYYY/MM/DD')}></DatePicker>
                            {/*<button id="date-confirm"*/}
                            {/*onClick={() => this.update_rest_waitlist(this.state.validate_user.workFor)}>Confirm*/}
                            {/*</button>*/}
                            <button id="date-confirm" onClick={() => this.setModalState(true)}>New Guests</button>
                        </div>
                        <div id="res-holder">
                            <strong id="reserv-header">Reservations</strong>
                            {this.state.items.filter((item) => {
                                return item.type === "Reservation";
                            }).length === 0 ? (
                                <React.Fragment>
                                    <br/>
                                    <p>No reservation added for today yet.</p>
                                    <p>Please click the "New Guests" button to add a new reservation.</p>
                                </React.Fragment>
                            ) : null}
                            {this.state.items.map((item, index) => {
                                if (item.type === "Reservation") {
                                    return (
                                        <OverlayTrigger
                                            trigger="click"
                                            rootClose
                                            key={index}
                                            placement={"down"}
                                            overlay={
                                                <Popover id={`popover-positioned-${"down"}`}>
                                                    <Popover.Content>
                                                        <div>
                                                            <span> <FontAwesomeIcon icon={faClock}/>
                                     <span
                                         className=
                                             "reservation_time">{item.estimated_time}</span></span>
                                                        </div>
                                                        <div>
                                     <span> <FontAwesomeIcon icon={faCalendarAlt}/>
                                         <span
                                             className="reservation_date">  {item.date_of_arrival}</span></span>
                                                        </div>
                                                        <div className="num_people">
                                                            <span> <FontAwesomeIcon icon={faUser}/><span
                                                                className="attendence">{item.people}</span></span>
                                                        </div>
                                                        <div>
                                                            <span> <FontAwesomeIcon icon={faConciergeBell}/><span
                                                                className="attendence">{item.reserved ? 'Reserved' : 'Not Reserved'}</span></span>
                                                        </div>
                                                        <div className="user_profile_holder">
                                                        </div>

                                                    </Popover.Content>
                                                </Popover>
                                            }>
                                            <Card key={index} className="card border-light mb-3 rese-card" bg="light"
                                                  style={{width: '18rem'}}>
                                                <Card.Header className="header-of-card">
                                                    <div className="pic-container">
                                                        <strong>
                                                            {item.name}
                                                        </strong>
                                                    </div>
                                                    <span><span className="attendence">{`${item.people} people`}</span></span>
                                                    <span className="Button-container">
                     {this.render_button(item, index)}
                                                        <button
                                                            className="reject-button"
                                                            onClick={e =>
                                                                this.remove_reservation_from_items(index)
                                                            }
                                                            onMouseDown={this.removefocus}
                                                        >
                         <img src={process.env.PUBLIC_URL + "/images/restaurant_images/no-stopping.png"}></img>
                       </button>
                       </span>
                                                </Card.Header>
                                            </Card>
                                        </OverlayTrigger>
                                    );
                                }
                            })}
                        </div>
                        <div id="res-holder">
                            <strong id="reserv-header">Waitlist</strong>
                            {this.state.items.filter((item) => {
                                return item.type === "Waitlist";
                            }).length === 0 ? (
                                <React.Fragment>
                                    <br/>
                                    <p>No one is on the waitlist for today yet.</p>
                                    <p>Please click the "New Guests" button to add guests to the waitlist.</p>
                                </React.Fragment>
                            ) : null}
                            {this.state.items.map((item, index) => {
                                if (item.type === "Waitlist") {
                                    return (
                                        <OverlayTrigger
                                            trigger="click"
                                            rootClose
                                            key={index}
                                            placement={"down"}
                                            overlay={
                                                <Popover id={`popover-positioned-${"down"}`}>
                                                    <Popover.Content>
                                                        <div>
                                                            <span> <FontAwesomeIcon icon={faClock}/>
                                     <span
                                         className=
                                             "reservation_time">{item.estimated_time}</span></span>
                                                        </div>
                                                        <div>
                                     <span> <FontAwesomeIcon icon={faCalendarAlt}/>
                                         <span
                                             className="reservation_date">  {item.date_of_arrival}</span></span>
                                                        </div>
                                                        <div className="num_people">
                                                            <span> <FontAwesomeIcon icon={faUser}/> <span
                                                                className="attendence">{item.people}</span></span>
                                                        </div>
                                                        <div>
                                                            <span><FontAwesomeIcon icon={faConciergeBell}/><span
                                                                className="attendence">{item.reserved ? 'Reserved' : 'Not Reserved'}</span></span>
                                                        </div>
                                                        <div className="user_profile_holder">
                                                        </div>

                                                    </Popover.Content>
                                                </Popover>
                                            }>
                                            <Card key={index} className="card border-light mb-3 rese-card" bg="light"
                                                  style={{width: '18rem'}}>
                                                <Card.Header className="header-of-card">
                                                    <div className="pic-container">
                                                        <strong>
                                                            {item.name}
                                                        </strong>
                                                    </div>
                                                    <span><span className="attendence">{`${item.people} people`}</span></span>
                                                    <span className="Button-container">
                     {this.render_button(item, index)}
                                                        <button
                                                            className="reject-button"
                                                            onClick={e =>
                                                                this.remove_reservation_from_items(index)
                                                            }
                                                            onMouseDown={this.removefocus}
                                                        >
                         <img src={process.env.PUBLIC_URL + "/images/restaurant_images/no-stopping.png"}></img>
                       </button>
                       </span>
                                                </Card.Header>
                                            </Card>
                                        </OverlayTrigger>
                                    );
                                }
                            })}
                        </div>
                        <div id="avaliable_seats_container" onMouseDown={this.removefocus}>
                            {
                                this.state.all_table.map((item, index) => (
                                    <Card key={index} id={`Table-${index}`} className="tablecard" style={{
                                        backgroundColor: this.state.reservations_color[index],
                                        width: '14rem'
                                    }} onMouseOver={(e) => this.handleMouseOver(index)}
                                          onMouseLeave={() => this.resumecard(index)}>
                                        <Card.Header className="header-of-card">
                                            <strong>
                                                {`Table-${index + 1}`}
                                            </strong>
                                            <span className="cap-word">Capacity: {item.table_capacity}</span>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="user_profile_holder">
                                                <div className="check-container">
                                                    <button className="reject-button"
                                                            onClick={(e) => this.empty_seats(index)}
                                                            onMouseDown={this.removefocus}><img
                                                        src={process.env.PUBLIC_URL + "/images/restaurant_images/no-stopping.png"}></img>
                                                    </button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            }
                        </div>
                        <VerticalModal
                            show={this.state.modal_show}
                            onHide={() => this.setModalState(false)}
                            add_reservation={this.add_reservation}
                        ></VerticalModal>
                    </div>
                </div>
            );

        } else {
            return null;
        }
    }
}

// getting from reducers (error and auth reducers)
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    current_user: state.auth.user,
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Employee));
