import ScheduleSelector from 'react-schedule-selector';
import ListErrors from "./ListErrors";
import React from "react";
import { connect } from "react-redux";
import {
  APPLY_TO_TEACH_UNLOADED,
  APPLY_TO_TEACH,
  UPDATE_FIELD_APPLY_TO_TEACH
} from "../constants/actionTypes";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  onChangeSkill: (value) =>
    dispatch({ type: UPDATE_FIELD_APPLY_TO_TEACH, key: "skill", value }),
  onChangeAvailability: (value) =>
    dispatch({ type: UPDATE_FIELD_APPLY_TO_TEACH, key: "availability", value }),
  onSubmit: (skill, availability) =>
    dispatch({
      type: APPLY_TO_TEACH,
      payload: [skill, availability], //agent.Teacher.ApplyToTeach(skill, availability),
    }),
  onUnload: () => dispatch({ type: APPLY_TO_TEACH_UNLOADED }),
});

class ApplyToTeach extends React.Component {
  constructor() {
    super();
    this.changeSkill = (ev) => this.props.onChangeSkill(ev.target.value);
    this.changeAvailability = (ev) => this.props.onChangeAvailability(ev);
    this.submitForm = (skill, availability) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(skill, availability);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const skill = this.props.skill;
    const availability = this.props.availability;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Apply to teach</h1>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(skill, availability)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      placeholder="Skill"
                      value={skill}
                      onChange={this.changeSkill}
                    />
                  </fieldset>

                  <ScheduleSelector
                    selection={availability}
                    margin="1"
                    numDays="14"
                    selectionScheme="square"
                    onChange={this.changeAvailability}
                  />

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Apply to teach
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyToTeach);
