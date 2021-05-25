import React, { Component } from 'react';
import './_customTab.scss';

class CustomTab extends Component  {
  state = {
    activeTab: '0'
  }

  onClickTab = (selectedTab, selectedKey) => {
    this.setState({ activeTab: selectedKey })
    this.props.onClickTab(selectedTab);
  }

  render () {
    const { activeTab } = this.state;
    const { tabs } = this.props;

    return (
      <div className={`custom-tab tab-${activeTab}`}>
        <span className="custom-tab-active-indicator"></span>
        { tabs.map((tab, i) => {
            return <span onClick={(event) => this.onClickTab(tab.to, tab.key)} key={i}>{tab.title}</span>
          })
        }
      </div>
    )
  }
}

export default CustomTab;
