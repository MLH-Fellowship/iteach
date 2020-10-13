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
    <div className="article-preview">
      <div className="article-meta">
          <img src={teacher.profilePicture} alt={teacher.name} />
        </div>
        <div className="info">
          <div className="author">{teacher.name} {teacher.surname}</div>
      </div>

      <div className="preview-link">
    <h2>I teach {teacher.skill}</h2>
    <p>{teacher.bio}</p>
      </div>
      </div>
  )})
};
}
/*  <div>
          <img src={teacher.profilePicture} alt={teacher.name} />
        <div>*/

export default TeacherList;
