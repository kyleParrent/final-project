import React from 'react';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewedArticle: null,
      theButtonClass: '',
      theButtonText: ''
    };
  }

  componentDidMount() {
    if (this.props.review.rating === 'inform') {
      this.setState({ theButtonClass: 'inform', theButtonText: 'Informative' });
    } else {
      this.setState({ theButtonClass: 'persuade', theButtonText: 'Persuasive' });
    }
  }

  render() {
    return (
      <div className='row'>
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className={this.state.theButtonClass}>
                {this.state.theButtonText}
              </div>
              <p>By: Fake Username Joe</p>
            </div>
          </div>
          <div className="row">
            <p>Comments:</p>
            <p>{this.props.review.comments}</p>
          </div>
          <div className="row">
            <a href={`#info?articleId=${this.props.review.articleId}`}>The article</a>
          </div>
        </div>
      </div>
    );
  }
}
