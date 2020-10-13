import TeacherPreview from './TeacherPreview';
import ListPagination from './ListPagination';
import React from 'react';
import _superagent from 'superagent';
import axios from 'axios';
import _ from 'lodash';


class TeacherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: []
    };
  }
  
  componentDidMount(){
    axios
      .get('http://localhost:8080/api/teachers')
      .then((response)=> {
          this.setState({
            teachers: response.data
          });
    })
  }
  
  render() {
    console.log("myteachers:"+JSON.stringify(this.state.teachers));
    if (!this.state.teachers) {
      return (
        <div className="teacher-preview">Loading...</div>
      );
    }
  
    if (this.state.teachers.length === 0) {
      return (
        <div className="teacher-preview">
          No teachers yet!
        </div>
      );
    }

  return _.map(this.state.teachers, teacher => {
    return(
      <div>
        <div>{teacher.name}</div>
        <div>{teacher.skill}</div>
      </div>
    )
  })
};
}


export default TeacherList;
