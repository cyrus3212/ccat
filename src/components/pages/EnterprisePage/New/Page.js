import React, { Component } from 'react';
import EnterpriseDetailForm from '../../../widgets/Enterprise/EnterpriseDetailForm';

class Page extends Component {

  render() {

    return (
      <EnterpriseDetailForm enterpriseId={0} />
    );
  }

}

Page.displayName = '[Enterprise Page] - New Detail';

export default Page;
