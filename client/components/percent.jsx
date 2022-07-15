import React from 'react';

export default class Percent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      informPercent: null,
      persuadePercent: null,
      isLoading: true
    };
  }

  componentDidMount() {
    let total;
    fetch(`/api/all-reviews/${this.props.articleId}`)
      .then(res => res.json())
      .then(result => {
        total = parseInt(result.count);
        fetch(`/api/all-inform-reviews/${this.props.articleId}`)
          .then(res => res.json())
          .then(result => {
            const informTotal = parseInt(result.count);
            const persuadeTotal = total - informTotal;
            const inPercent = Math.round((informTotal / total) * 100);
            const pePercent = Math.round((persuadeTotal / total) * 100);
            this.setState({ informPercent: inPercent, persuadePercent: pePercent, isLoading: false });
          });
      });
  }

  render() {
    if (this.state.isLoading === true) {
      return;
    }
    return (
      <div className="row justify-content-center">
        <div className='col-12 d-flex justify-content-center'>
          <h1>Rating Breakdown</h1>
        </div>
        <div className='col-12 d-flex justify-content-center mt-4 mb-4'>
          <h3 className='me-5 display-6 inform p-1'>Informative: {this.state.informPercent}%</h3>
          <h3 className='display-6 persuade p-1'>Persuasive: {this.state.persuadePercent}%</h3>
        </div>
      </div>
    );
  }
}
