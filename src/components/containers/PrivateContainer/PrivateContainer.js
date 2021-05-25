import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import PropTypes from 'prop-types';
import '../_app.scss';
import { getUserWorkbookAccess } from '../../../api/userWorkbookAccessApi';
import { getWorkbookSections } from '../../../api/menuSectionApi';
import { getMenuWorkbooks } from '../../../api/menuApi';
import NotAllowedPage from '../../pages/NotAllowedPage';
import WorkbooksPage from '../../pages/WorkbooksPage';
import Loader from '../../reusable/Loader';
import ReviewPage from '../../pages/ReviewPage';
import { routePath } from '../../../helpers/routesHelper';
import { getComponentByCode } from '../../../helpers/componentHelper';
import api from '../../../utils/Http';
import CompletePage from '../../pages/CompletePage';
import { PrivateContainerProvider } from './PrivateContainerContext';

class PrivateContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isUserMenuVisible: false,
      redirectToReviewPage: false,
      userWorkbookAccess: {},
      menus: [{
        "value": "CHR",
        "label": "Chart of Accounts"
      },
      {
        "value": "ACN",
        "label": "Accounting"
      },
      {
        "value": "SFI",
		    "label": "Sales / F&I",
      },
      {
        "value": "PRT",
		    "label": "Parts",
      },
      {
        "value": "SRV",
		    "label": "Service",
      },
      {
        "value": "PYR",
		    "label": "Payroll",
      }],
      stores: [],
      menuSections: [],
      dtid: '',
      enterpriseCode: '',
      isValidEnterprise: false,
      workbookSection: {}
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState({isValidEnterprise: false});
    const http = api();
    http.get('User').then(res => {
      if (res.data.isOk) {
        const user = res.data.data;
        this.setState({user: res.data.data});
        this.handleSectionAndWorkbookAccess(res.data.data);
      }
    });
  }

  static getDerivedStateFromProps(nextProps, state) {
    let menuSections = state.menuSections;
    let menus = state.menus;
    let userWorkbookAccess = state.userWorkbookAccess;

    try {
      if (nextProps.menuSections.data !== menuSections) {
        menuSections = nextProps.menuSections.data;
      }

      if (nextProps.menus.data !== menus && nextProps.menus.data.length > 0) {
        menus = nextProps.menus.data;
      }

      if (nextProps.userWorkbookAccess.data != userWorkbookAccess) {
        userWorkbookAccess = nextProps.userWorkbookAccess.data;
      }

      return {menuSections: menuSections, menus: menus, userWorkbookAccess: userWorkbookAccess, workbookSection: nextProps.workbookSection};
    }
    catch (e) {
      return {...nextProps, ...state};
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isValidEnterprise === true) {
      this.setState(this.baseState);
      this.componentDidMount();
    }
  }

  handleSectionAndWorkbookAccess = (user) => {
    const {match} = this.props.children.props;
    let dtid = '';
    const http = api();

    let enterpriseCode = '';
    let workbookCode = '';

    if (match.params.code !== '' && match.params.code !== undefined) {
      enterpriseCode = match.params.code;
    }
    else {
      // default user role enterprise code
      enterpriseCode = user.enterpriseCode;
    }

    // we call the menu profile, to get the store default and dtid
    http.get(`Menu/profile/${enterpriseCode}`).then(res => {
      if (res.data.isOk) {
        const response = res.data;
        const stores = response.data.stores;

        try {
          if (match.params.dtid === '' || match.params.dtid === undefined) {
            dtid = response.data.stores[0].dtid;
          }
          else {
            dtid = match.params.dtid;
          }
        }
        catch (e) {
          dtid = match.params.dtid;
        }

        this.setState({dtid: dtid, stores: stores});
        // Menu Workbooks
        this.props.dispatch(getMenuWorkbooks(`${enterpriseCode}/${dtid}`));
        try {

          if (match.path === routePath('configure')) {
            workbookCode = 'configure';
          }
          else {
            workbookCode = match.params.name;
          }

          // This is when accessing workbook
          this.props.dispatch(getUserWorkbookAccess(`EnterpriseCode=${enterpriseCode}&DTID=${dtid}&workbook=${workbookCode}`));
          if (match.path === routePath('workbook'))
          {
            if (workbookCode !== undefined || workbookCode !== '') {
              // Get all the workbook sections
              this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbookCode}`));
            }
          }
        }
        catch (e) {

        }

      } // End of if condition
      else {
        this.setState({isValidEnterprise: true});
      }

    });
  }

  handleToggleUserMenu = () => {
    this.setState({
      isUserMenuVisible: !this.state.isUserMenuVisible
    });
  }

  getPageMainTitle = () => {
    const {match} = this.props.children.props;
    const { menus } = this.state;
    let title = this.props.title || '';

    if (title === '') {
      let filteredMenu = {};
      try {
        if (Object.keys(menus).length > 0) {
          filteredMenu = menus.filter(menu => {
            return menu.value === match.params.name;
          });

          return filteredMenu[0].label;
        }
      }
      catch (e) {
        return title;
      }
    }

    return title;
  }

  checkWorkbookExist = (workbookCode) => {
    const {match} = this.props.children.props;
    const { menus } = this.state;
    const filteredMenu = menus.filter(menu => {
      return menu.value === workbookCode;
    });

    if (filteredMenu.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  getPageSectionTitle = () => {
    const {match} = this.props.children.props;
    const { menuSections, menus }  = this.state;
    let filteredSection = {};

    if (match.path === routePath('configure')) {
      return "User Setup";
    }

    if (match.path === routePath('review') || match.path === routePath('complete')) {

      const title = menus.filter(menu => {
        if (menu.value === match.params.name) {
          return menu.label;
        }
      });

      if (title.length > 0) {
        return title[0].label;
      }
      else {
        return '';
      }
    }

    if (match.path === routePath('workbook'))
    {
      try {
        if (menuSections.length > 0) {

          filteredSection = menuSections.filter(section => {
            return section.value === this.getActiveSectionMenu();
          });

          return filteredSection[0].label;
        }
      }
      catch (e) {

      }
    }

  }

  /**
   * Get the active or selected section menu
   *
   */
  getActiveSectionMenu = () => {
    const {match} = this.props.children.props;
    const { menuSections, menus }  = this.state;
    let activeSectionMenu = '';
    let dtid = this.state.dtid;
    dtid = (dtid === '' || dtid === undefined) ? match.params.dtid : dtid;

    if (match.path === routePath('configure')) {
      return 'CRT_01';
    }
    else if (match.path === routePath('workbook')) {
      if (match.params.section === '' || match.params.section === undefined) {
        const filteredMenu = menus.find(menu => {
          return menu.value === match.params.name;
        });

        // will check for the selected workbook its completion percentage
        try {
          if (parseInt(filteredMenu.completionPercentage) === 100) {
            return 'review';
          }
        }
        catch (e) {

        }

        // set as active default menu with iscomplete status false
        activeSectionMenu = match.params.name + '_01';
        try {
          if (menuSections.length > 0) {
            const filteredSection = menuSections.find(section => {
              return section.isComplete === false;
            });
            activeSectionMenu = filteredSection.value;//filteredSection[0].label;
          }
        }
        catch (e) {

        }

        return activeSectionMenu;
      }

      return match.params.section;
    }
  }

  setDefaultLocation = () => {
    const { match } = this.props.children.props;
    const { menuSections }  = this.state;
    let activeSection = "";
    let dtid = this.state.dtid;
    dtid = (dtid === "" || dtid === undefined) ? match.params.dtid : dtid;
    if (match.path === routePath('workbook')) {
      activeSection = match.params.name + '_01';
      try {
        if (menuSections.length > 0) {
          const filteredSection = menuSections.find(section => {
            return section.isComplete === false;
          });
          activeSection = filteredSection.value;

          if (match.params.section === undefined) {
            this.props.children.props.history.push(`${dtid}/${activeSection}`);
          }
          else {
            // do nothing
          }
        }
      }
      catch (e) {

      }
    }
  }

  renderPage = (children, showSidebar=true, fullWidth) => {

    const {match} = this.props.children.props;
    const { user, isUserMenuVisible, menus, stores }  = this.state;
    let code = match.params.code;
    let isConfigure = false;
    let showHeaderTitleOnly = false;
    let dtid = this.state.dtid;
    dtid = (dtid === '' || dtid === undefined) ? match.params.dtid : dtid;

    if (match.params.name === 'dashboard' || match.path === '/welcome') {
      showSidebar = false;
    }

    if (match.path === routePath('complete')) {
      fullWidth = true
    }

    if (match.path === routePath('review') || match.path === routePath('complete')) {
      showHeaderTitleOnly = true;
    }

    if (match.path === routePath('configure')) {
      isConfigure = true;
    }

    return (<div className="main-layout">
        <div>
          <Header user={user} activeMenu={match.params.name} menus={menus} code={code} dtid={dtid} admin={false}
                  onToggleUserMenu={this.handleToggleUserMenu} isUserMenuVisible={isUserMenuVisible} stores={stores} />
          {showSidebar === true ? <Sidebar activeSectionMenu={this.getActiveSectionMenu()} isConfigure={isConfigure} showSidebar={showSidebar}
                                           showHeaderTitleOnly={showHeaderTitleOnly} workbook={match.params.name} enterpriseCode={code} dtid={dtid}
                                           subheaderTitle={this.getPageSectionTitle()} mainHeaderTitle={this.getPageMainTitle()} /> : ''}
          <div className={`dashboard dashboard--private `+(fullWidth === true ? `full-width`:`with-sidebar`)}>
            <PrivateContainerProvider value={this.state.workbookSection}>
              {children}
            </PrivateContainerProvider>
          </div>
        </div>
      </div>
    );
  }


  render() {
    // set the default location
    this.setDefaultLocation();

    const {match, history, location} = this.props.children.props;
    const {userWorkbookAccess, menus, user, isValidEnterprise} = this.state;
    let dtid = this.state.dtid;
    dtid = (dtid === '' || dtid === undefined) ? match.params.dtid : dtid;

    const params = {
      name: match.params.name,
      code: match.params.code,
      dtid: dtid,
      section: this.getActiveSectionMenu(),
    }

    if (isValidEnterprise === true) {
      return this.renderPage(<NotAllowedPage name={this.getPageMainTitle()} match={match.params} />, false);
    }

    // Review Section Page
    if (match.path === routePath('review')) {
      return this.renderPage(<ReviewPage match={params} history={history} location={location}/>);
    }

    // Complete page
    if (match.path === routePath('complete')) {
      return this.renderPage(<CompletePage match={params} history={history} workbooks={menus} location={location} />);
    }

    if (match.path === routePath('dashboard')) {
      return this.renderPage(<WorkbooksPage match={params} history={history} location={location}/>, false);
    }

    // We will not allow the user to access the page, except for dashboard and review page
    try {
      if (userWorkbookAccess.length === 0 || menus.length === 0 || user === null) {
        return <Loader />
      }

      if (match.path === routePath('configure')) {
        if (user.roleName === 'Admin' || user.roleName === 'DIO') {
          // return this.renderPage(<NotAllowedPage name={this.getPageMainTitle()} match={match.params} />, false);
        }
        else {
          return this.renderPage(<NotAllowedPage name={this.getPageMainTitle()} match={match.params} />, false);
        }
      }

      if (userWorkbookAccess.workbook === match.params.name && userWorkbookAccess.hasAccess === false) {
        // check if workbook exist
        if (this.checkWorkbookExist(userWorkbookAccess.workbook) === true) {
          return this.renderPage(<NotAllowedPage name={this.getPageMainTitle()} match={match.params} />, false);
        }
        // workbook or page does not exist
        else {
          if (match.path !== routePath('configure')) {
            return this.renderPage(<NotAllowedPage notFoundPage={true} name={this.getPageMainTitle()} match={match.params} />, false);
          }

        }
      }

    }
    catch (e) {
      // comment this line for developers and if API service is down
      if (match.path !== routePath('configure')) {
        return this.renderPage(<NotAllowedPage notFoundPage={true} name={this.getPageMainTitle()} match={match.params} />, false);
      }
    }

    if (match.path === routePath('workbook'))
    {
      if (match.params.section === '' || match.params.section === undefined)
      {
        // redirect to revie page, means that all section of the selected workbook is completed
        if (this.getActiveSectionMenu() === 'review') {
          return <Redirect to={`/reviews/${match.params.name}/${match.params.code}/${dtid}`} />;
        }

        const DefaultSectionComponent = getComponentByCode(this.getActiveSectionMenu());
        if (DefaultSectionComponent === undefined || DefaultSectionComponent === '') {
          // No component created yet
          return this.renderPage(<NotAllowedPage notFoundPage={true} name={this.getPageSectionTitle()} match={params} />, false);
        }
        else {
          return this.renderPage(<DefaultSectionComponent match={params} history={history} location={location}/>);
        }
      }
      else {
        const SectionComponent = getComponentByCode(match.params.section);
        if (SectionComponent === undefined || SectionComponent === '') {
          return this.renderPage(<NotAllowedPage name={this.getPageSectionTitle()} match={params} />);
        }
        else {
          return this.renderPage(<SectionComponent match={params} history={history} location={location}/>);
        }
      }

    }

    return this.renderPage(this.props.children);
  }
}

PrivateContainer.propTypes = {
  children: PropTypes.element,
  menus: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.any,
};

export default PrivateContainer;
