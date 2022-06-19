import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from './redirect';

export default class Review extends React.Component {
  componentDidMount() {
    if (this.props.review.rating === 'inform') {
      this.setState({ theButtonClass: 'inform no-button me-4 mt-2 text-dark', theButtonText: 'Informative' });
    } else {
      this.setState({ theButtonClass: 'persuade no-button me-4 mt-2', theButtonText: 'Persuasive' });
    }
  }

  render() {
    const { user } = this.context;
    if (!user) {
      return <Redirect to="#" />;
    }
    let theButtonClass;
    let theButtonText;
    if (this.props.review.rating === 'inform') {
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
              <p className='mb-0 mt-2'>By: {user.username}</p>
            </div>
          </div>
          <div className="row">
            <div className='col-12'>
              <p className='mt-2 mb-2'>Comments:</p>
              <p>{this.props.review.comments}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <a className='bg-dark mb-3 review-link rounded-2 text-white' href={`#info?articleId=${this.props.review.articleId}`}>Reviewed Article</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Review.contextType = AppContext;
