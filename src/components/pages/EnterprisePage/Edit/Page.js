import React, { Component } from 'react';
import EnterpriseDetailForm from '../../../widgets/Enterprise/EnterpriseDetailForm';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enterpriseId: 0
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
  }

  render() {
    const {match}  = this.props.params;
    return (
      <EnterpriseDetailForm enterpriseId={match.params.id} />
    );
  }

}

Page.displayName = '[Enterprise Page] - Edit Detail';

export default Page;
