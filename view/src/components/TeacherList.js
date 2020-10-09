import TeacherPreview from './TeacherPreview';
import ListPagination from './ListPagination';
import React from 'react';

const TeacherList = props => {
  if (!props.articles) {
    return (
      <div className="teacher-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="teacher-preview">
        No teachers yet!
      </div>
    );
  }

  return (
    <div>
      {
        props.articles.map(article => {
          return (
            <TeacherPreview article={article} key={article.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        teachersCount={props.teachersCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default TeacherList;
