import TeacherList from '../TeacherList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

const TeachersTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick(agent.Teachers.all);
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Teachers
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.teachersList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (payload) => dispatch({ type: CHANGE_TAB, payload })
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <TeachersTab tab={props.tab} onTabClick={props.onTabClick} />

        </ul>
      </div>

      <TeacherList />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
