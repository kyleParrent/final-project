import React from 'react';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      informButt: 'inform m-2 ms-0',
      perButt: 'persuade m-2',
      currentRating: null,
      currentReview: ''
    };
    this.handleClickInform = this.handleClickInform.bind(this);
    this.handleClickPersuade = this.handleClickPersuade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickInform(event) {
    this.setState({ informButt: 'inform-on m-2 ms-0', perButt: 'persuade-off m-2', currentRating: 'inform' });
  }

  handleClickPersuade(event) {
    this.setState({ informButt: 'inform-off m-2 ms-0', perButt: 'persuade-on m-2', currentRating: 'persuade' });
  }

  handleChange(event) {
    this.setState({ currentReview: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ articleInfo: this.props.info })
    };
    fetch('/api/article-review', req)
      .then(res => res.json())
      .then(result => {
        const newArticleId = parseInt(result.articleId);
        const req = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
        };
        fetch(`/api/user-review/${newArticleId}`, req)
          .then(res => res.json())
          .then(result => {
          });
      });
    window.location.hash = '#user-reviews';
  }

  render() {
    return (
      <div className='d-flex justify-content-center'>
        <div className='review-container'>
          <div className='d-flex justify-content-center'>
            <h1>YOUR OPINION:</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h5 className='labels mt-4'>What type of article is this?</h5>
              <div className='d-flex'>
                <button type='button' onClick={this.handleClickInform} className={this.state.informButt}>Informative</button>
                <button type='button' onClick={this.handleClickPersuade} className={this.state.perButt}>Persuasive</button>
              </div>
              <label htmlFor="reviewComment" className="form-label labels">Review / Reasoning</label>
              <textarea className="form-control" id="reviewComment" rows="20" onChange={this.handleChange}></textarea>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-dark m-3 me-0' type='submit'>SUBMIT</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

}
