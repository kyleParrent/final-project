import React from 'react';

export default function AllReviews(props) {
  let theButtonClass;
  let theButtonText;
  if (props.article.rating === 'inform') {
    theButtonClass = 'inform no-button me-4 mt-2 text-dark';
    theButtonText = 'Informative';
  } else {
    theButtonClass = 'persuade no-button me-4 mt-2';
    theButtonText = 'Persuasive';
  }
  return (
    <div className='row m-3'>
      <div className="col-12 bg-secondary rounded-3 text-white">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <div className={theButtonClass}>
              {theButtonText}
            </div>
            <p className='mb-0 mt-2'>By: Fake Username Joe</p>
          </div>
        </div>
        <div className="row">
          <p className='mt-2 mb-2'>Comments:</p>
          <p>{props.article.comments}</p>
        </div>
      </div>
    </div>
  );
}
