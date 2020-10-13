import TeacherList from './TeacherList';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import ScheduleSelector from "react-schedule-selector";
import { connect, shallowEqual } from 'react-redux';
import axios from 'axios';

import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';
//import teacher from '../../../api/models/teacher';


class OurTeacherProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: {},
      schedule: [],
      checkedBoxes: []
    };
  }

  componentWillMount() {
    axios
      .get(`http://localhost:8080/api/teachers/${this.props.match.params.id}`)
      .then((response)=> {
          this.setState({
            teacher: response.data,
            schedule: response.data.schedule,
            checkedBoxes: []
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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    let index = -1;
    let newSchedule = [...this.state.schedule];
    
    for (let i=0; i<newSchedule.length; i++) {
      if (newSchedule[i].date==name) {
          index = i;
          break;
      }
    }
    this.setState(prevState => ({
      checkedBoxes: [...prevState.checkedBoxes, index]
    }))
  }

   
  handleSubmit = (e) => {
    //e.preventDefault();
    let indexes = this.state.checkedBoxes;
    let newSchedule = [...this.state.schedule];
    for (let i=0; i<indexes.length;i++) {
      let item = {
        ...newSchedule[indexes[i]],
        booked: true
    };
    newSchedule[indexes[i]]= item;
    this.setState({ schedule: newSchedule}, () => {
      axios.put((`http://localhost:8080/api/teachers/${this.state.teacher._id}`), {schedule: this.state.schedule})
      .then((response)=> {
        console.log(response);
      })
    });
  }
  }

  renderArray() {
    var arr = this.state.schedule;
    let i =-1;
    return arr.map((day) => {
      console.log("day"+day.date)
      i = i+1;
      if (day.booked==false)  {
        let d = new Date(day.date);
        let n = d.toString();
        return(
          <div>
          <input type="checkbox" key={d} name={day.date} onChange={this.handleInputChange}
    checked={this.state.friend}/>
        <label for={day}>{n}</label>
          </div>
        )
        }
    })
    
  }
  
  render() {
    var teacher = this.state.teacher;
    console.log("array "+JSON.stringify(this.state.arr))
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
              <div>
                <form>
                {this.renderArray()}
                <input type="Submit" onClick={this.handleSubmit}></input>
                </form>
              </div>


             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurTeacherProfile;
/*
 <ScheduleSelector
                selection={this.state.schedule}
                margin="1"
                numDays="14"
                selectionScheme="square"
               // renderDateCell={this.renderCustomDateCell}
                dateFormat="ddd M/D"
                onChange={this.handleChange}
              />*/