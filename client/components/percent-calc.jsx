import React from 'react';

export default class PercentCalc extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    inform: null,
    persuade: null
  }
  }

  componentDidMount() {
    if (this.props.review.rating === 'inform') {
      this.setState({ theButtonClass: 'inform no-button me-4 mt-2 text-dark', theButtonText: 'Informative' });
    } else {
      this.setState({ theButtonClass: 'persuade no-button me-4 mt-2', theButtonText: 'Persuasive' });
    }
  }

  render() {

  }
}
