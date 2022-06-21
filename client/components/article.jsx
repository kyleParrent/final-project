import React from 'react';

export default function Article(props) {
  return (
      <a className="col-5 bg-white m-2 cards" href={`#info?articleIndex=${props.index}`}>
        <div className='d-flex justify-content-center'>
          <img className="img-thumbnail" src={props.article.image}></img>
        </div>
        <h3>{ props.article.title }</h3>
        <p className='descript'>{ props.article.description }</p>
      </a>
  );
}
