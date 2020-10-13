import TeacherList from './TeacherList';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import ScheduleSelector from "react-schedule-selector";
import { connect } from 'react-redux';
import axios from 'axios';

import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: {}
    };
  }

  componentWillMount() {
    console.log("this.props"+JSON.stringify(this.props.match.params.id))
    axios
      .get(`http://localhost:8080/api/teachers/${this.props.match.params.id}`)
      .then((response)=> {
          this.setState({
            teacher: response.data
          })
    })
  }

  componentWillUnmount() {
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        
      </ul>
    );
  }

  
	handleChange = (event) => {
    alert("booking!")
	};
  

  render() {
    var teacher = this.state.teacher;
    // TEST ARRAY: THIS WILL BE REPLACED WITH API RESPONSE
    var test = [
      {
        "day": 1,
        "hour": 11
      },
      {
        "day": 3,
        "hour": 10
      }
  ] 
  console.log("api response "+JSON.stringify(teacher.availability))
  console.log("test "+JSON.stringify(test))

  var available = test; 
  console.log("available "+JSON.stringify(available))

    
  
  // getDay(): 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wed
    const scheduleArray = [];
    available.map((slot) => {
      var start = new Date();
      start.setMinutes(0);
      var end = new Date();
      end.setDate(end.getDate() + 14);
      for (;start < end; start.setHours(start.getHours()+1)) {
        if (start.getDay()===slot.day && start.getHours()==slot.hour) {
          scheduleArray.push(new Date(start));
        }
    }
    })

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
               <img src={teacher.profilePicture} className="user-img" alt={teacher.name}></img>
              <h2>{teacher.name} {teacher.surname}</h2>
              <p>{teacher.bio}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <h2>Book a lesson with me!</h2>
              <ScheduleSelector
                selection={scheduleArray}
                margin="1"
                numDays="14"
                selectionScheme="square"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
