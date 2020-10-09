import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { TEACHER_BOOKED, TEACHER_UNBOOKED } from '../constants/actionTypes';

const BOOKED_CLASS = 'btn btn-sm btn-primary';
const NOT_BOOKED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: TEACHER_BOOKED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: TEACHER_UNBOOKED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const TeacherPreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    BOOKED_CLASS :
    NOT_BOOKED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            Book Lesson
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(TeacherPreview);
