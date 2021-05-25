import React, { Component, Fragment } from 'react';
import './_sidebar.scss';
import { Link } from 'react-router-dom';
import { getWorkbookSections } from '../../../api/menuSectionApi';
import { addCurrentWorkbookSection, updateCurrentWorkbookSection } from '../../../api/workbookSectionApi';
import Loader from '../../reusable/Loader';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSections: [],
      configure: [
        {
          value: 'CRT_01',
          label : 'User Setup'
        }
      ],
      workbook: {}
    };
  }

  componentDidMount() {
    if (this.props.workbook === undefined || this.props.workbook === '') {
      // do nothing
    }
    else {
      this.props.dispatch(getWorkbookSections(this.props.enterpriseCode+'/'+this.props.dtid+'/'+this.props.workbook));
    }

    const { activeSectionMenu, enterpriseCode, dtid, workbook } = this.props;

    let currentWorkbookSection = {
      dtid,
      enterpriseCode,
      workbook,
      section: activeSectionMenu
    };

    this.props.dispatch(addCurrentWorkbookSection(currentWorkbookSection))
  }

  static getDerivedStateFromProps(nextProps, state) {
    let menuSections = state.menuSections;

    if (nextProps.menuSections.data !== menuSections) {
      menuSections = nextProps.menuSections.data;
    }

    return {menuSections: menuSections, workbook: nextProps}
  };

  handleOnClickLink = (menu) => {
    const { dtid, enterpriseCode, workbook } = this.props;
    const { value } = menu;

    let currentWorkbookSection = {
      dtid,
      enterpriseCode,
      workbook,
      section: value
    };

    this.props.dispatch(updateCurrentWorkbookSection(currentWorkbookSection))
  }

  render() {

    const workbook = (this.props.workbook !== '' || this.props.workbook !== undefined) ? '/'+this.props.workbook : '';
    const enterpriseCode = (this.props.enterpriseCode !== '' || this.props.enterpriseCode !== undefined) ? '/'+this.props.enterpriseCode : '';
    const dtid = (this.props.dtid !== '' || this.props.dtid !== undefined) ? '/'+this.props.dtid : '';
    let {menuSections, configure} = this.state;
    let menu = [];

    try {

      if (this.props.isConfigure === true) {
        menu = configure.map((menu, index) => {
          const isActive = this.props.activeSectionMenu === menu.value ? 'active' : null;
          return (
            <li key={index} detail={menu} className={isActive}><Link to={'/configure'+enterpriseCode+dtid}>{menu.label}</Link></li>
          );
        });
      }
      else {
        menu = menuSections.map((menu, index) => {
          const isActive = this.props.activeSectionMenu === menu.value ? 'active' : null;
          return (
            <li key={index} detail={menu} className={isActive}>
              <Link onClick={e => this.handleOnClickLink(menu)} to={'/workbooks'+workbook+enterpriseCode+dtid+'/'+menu.value} className={`${menu.isComplete ? 'completed' : ''}`}>
                {menu.label}
                <i className="fas fa-check sidebar-complete-icon" />
              </Link>
            </li>
          );
        });
      }
    }
    catch (e) {

    }

    return (
      <Fragment>

        {this.props.showHeaderTitleOnly ? <div className="sub-header">{this.props.subheaderTitle}</div> : <div className="sidebar__header-sub">{this.props.subheaderTitle}</div>}

        {this.props.showHeaderTitleOnly ? '' : <div className="sidebar">
          <div className="sidebar__header">
            <i className="fas fa-chevron-left"/> {this.props.mainHeaderTitle}
          </div>
          <span className="sidebar-section-menu">
            <ul>
              {menu}
            </ul>
          </span>
        </div>}

      </Fragment>
    );
  }
}

export default Sidebar;
