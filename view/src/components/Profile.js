import TeacherList from './TeacherList';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import ScheduleSelector from "react-schedule-selector";
import { connect } from 'react-redux';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  ...state.teachersList,
  currentUser: state.common.currentUser,
  profile: state.profile,
  schedule: state.schedule,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class Profile extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.match.params.username),
      agent.Articles.byAuthor(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}`}>
            My info
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}/teachers`}>
            My teachers
          </Link>
        </li>
      </ul>
    );
  }

  
	handleChange = (event) => {
    alert("booking!")
	};
  

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    // TEST ARRAY: THIS WILL BE REPLACED WITH API RESPONSE
    var available = [
      {
        "day": 1,
        "hour": 11
      },
      {
        "day": 3,
        "hour": 10
      }
  ] 

  
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


    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img
                  src={profile.image}
                  className="user-img"
                  alt={profile.username}
                />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                <EditProfileSettings isUser={isUser} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">{this.renderTabs()}</div>

              <ScheduleSelector
                selection={scheduleArray}
                margin="1"
                numDays="14"
                selectionScheme="square"
                onChange={this.handleChange}
              />

              <TeacherList
                pager={this.props.pager}
                articles={this.props.articles}
                teachersCount={this.props.teachersCount}
                state={this.props.currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
