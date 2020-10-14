import ScheduleSelector from 'react-schedule-selector';
import ListErrors from "./ListErrors";
import React from "react";
import agent from '../agent';
import { connect } from "react-redux";
import {
  APPLY_TO_TEACH_UNLOADED,
  APPLY_TO_TEACH,
  UPDATE_FIELD_APPLY_TO_TEACH
} from "../constants/actionTypes";
import axios from 'axios';

 /*
  <input
  className="form-control form-control-lg"
  placeholder="Availability"
  value={availability}
  onChange={this.changeAvailability}
/>*/

const mapStateToProps = (state) => ({ 
  ...state,
  currentUser: state.common.currentUser
 });


class ApplyToTeach extends React.Component {
  constructor() {
    super();
    this.state = {
      skill: "",
      availability: []
    }
    };

  componentWillMmount() {

  }

  
  handleInputChange = (event) => {
    this.setState({
      skill: event.target.value
    });
  }
 
  submitForm() {
    alert("submit!");
    let id = window.localStorage.getItem(id);
    console.log("idddd",id);
    axios
    .post(`http://localhost:8080/api/teachers/${this.props.match.params.id}`, {_id: id, skill: this.state.skill, availability: this.state.availability})
    .then((response) => {
      console.log("response" + JSON.stringify(response));
      alert("response!");

    })
    .catch((err) => {
      console.log("err"+err);
      alert("errrr!");

    })
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Apply to teach</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text"
                      className="form-control form-control-lg"
                      name="skill"
                      placeholder="Skill"
                      value={this.state.skill}
                      onChange={this.handleInputChange}
                    />
                   
                  </fieldset>
                  <input type="Submit" className="btn btn-lg btn-primary pull-xs-right" onClick={this.submitForm}></input>

                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplyToTeach;
