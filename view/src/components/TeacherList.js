import TeacherPreview from './TeacherPreview';
import ListPagination from './ListPagination';
import React from 'react';
import _superagent from 'superagent';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';



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
        <Link to={`@${teacher._id}`}>
          <img src={teacher.profilePicture} alt={teacher.name} />
          </Link>
        </div>
        <div className="info">
        <Link to={`@${teacher._id}`}>
          <div className="author">{teacher.name} {teacher.surname}</div>
          </Link>
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
