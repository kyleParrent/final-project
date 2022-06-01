import React from 'react';

export default function Article(props) {
  return (
    <div className="col-5 bg-white border border-2 border-dark m-2">
        <img className="img-thumbnail" src={ props.article.image }></img>
        <h3>{ props.article.title }</h3>
        <p>{ props.article.description }</p>
        <a href={`#articles?articleId=${props.index}`}>
      </a>
    </div>
  );
}
