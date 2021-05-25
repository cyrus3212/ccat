import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getSectionLink } from '../../../helpers/routesHelper';
import commonTranslate from '../../../translation/common.json';
import FooterFormAction from '../../reusable/FooterFormAction';
import { getUserProfile } from '../../../api/userApi';
import Modal from 'react-bootstrap/lib/Modal';
import ClearDataModal from '../../reusable/ClearDataModal';
import { postClearData } from '../../../api/clearDataApi';
import LoaderModal from '../../reusable/LoaderModal';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
      redirectTo: "",
      role: "",
      isShowClearDataModal: false,
      isHideClearDataModal: true,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      clearStatus: false,
      hasError: false
    };

    this.baseState = this.state
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getUserProfile());
  }

  static getDerivedStateFromProps(nextProps, state) {
    let role = state.role;
    let loaderStatus = state.loaderStatus;
    let loaderMessage = state.loaderMessage;
    let clearStatus = state.loaderStatus;
    let hasError = nextProps.hasError || false;

    /**
    * Handle response on clear data
    */
    try {
      if (state.isClearData === true) {
        if (nextProps.clearData.isOk === true ) {
          loaderStatus = commonTranslate.success;
          loaderMessage = commonTranslate.successDeletedRecords;
          clearStatus = true;
        }
        else {
          loaderStatus = commonTranslate.error;
          loaderMessage = nextProps.clearData.errorMessage;
        }
      }
      role = nextProps.user.data.roleName;
    }
    catch (e) {

    }

    return {
      role,
      loaderStatus,
      loaderMessage,
      clearStatus,
      hasError,
      isClearData: false
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.clearStatus === true && this.state.loaderStatus === "success") {
      this.props.onClearDataComplete();
    }
  }

  handleOnClickReviewComplete = () => {
    this.setState({
      isRedirect: true,
      redirectTo: getSectionLink(this.props.match, 'complete')
    });
  }

  handleOnClickNextWorkbook = () => {
    this.setState({
      isRedirect: true,
      redirectTo: getSectionLink(this.props.match)
    });
  }

  handleClearDataModal = () => {
    this.setState({ isShowClearDataModal: true });
  }

  handleMarkAsComplete = () => {
    const { summary } = this.props;
    const { role, hasError } = this.state;
    let isCompleted = false;

    try {
      if (role === "Admin") {
        isCompleted = summary.isCompleted;
      }

    } catch (e) {

    }

    if (typeof this.props.onMarkAsComplete === 'function') {
      if ( role === "Admin" || role === "DIO" ) {
        // if error on mark as complete, this is usually applies to direct form where mark as complete dispatches saving the data
        if (hasError === false) {
          isCompleted = isCompleted === true ? false : true;
        }

        // Note: remove this line if you want this feature enabled in production
        // if (process.env.REACT_APP_ENV === "production") {
        //   isCompleted = true
        // }

        this.props.onMarkAsComplete(isCompleted);
      }
      else {
        this.props.onMarkAsComplete(true);
      }
    }
  }

  getFooterActions = () => {
    const { page, summary } = this.props;
    const { role, hasError } = this.state;

    let isCompleted = false;
    let markCompleteLabel = commonTranslate.markAsComplete;

    try {
      isCompleted = summary.isCompleted;
    } catch (e) {

    }

    if (role === "Admin") {
      if (hasError === true) {
        markCompleteLabel = (isCompleted === true) ? commonTranslate.markAsComplete : commonTranslate.markAsUncomplete;
      }
      else {
        markCompleteLabel = (isCompleted === true) ? commonTranslate.markAsUncomplete : commonTranslate.markAsComplete;
      }
    }

    // Note: remove this line if you want this feature enabled in production
    // if (process.env.REACT_APP_ENV === "production") {
    //   markCompleteLabel = commonTranslate.markAsComplete
    // }

    if (page === '' || page === undefined) {
      if ( role === "Admin" || role === "DIO" ) {
        return [
          {
            name : commonTranslate.back,
            url : '#',
            position : 'left',
            id: 'actionBtnBack',
            buttonStyle : 'link',
            'url': getSectionLink(this.props.match, this.props.linkTo || 'dashboard')
          },
          {
            name : commonTranslate.saveAndContinue,
            url : '#',
            position : 'right',
            id: 'actionBtnSaveCon',
            buttonStyle : 'primary',
            onClick: this.props.onSaveAndContinue !== undefined ? this.props.onSaveAndContinue : null,
            disabled: this.props.disabledSave
          },
          {
            name : markCompleteLabel,
            url : '#',
            position : 'right',
            id: 'actionBtnCom',
            buttonStyle : 'default',
            onClick: this.handleMarkAsComplete
          },
          {
            position: 'right',
            id: 'actionSpacer',
            buttonStyle : 'spacer'
          },
          {
            name : commonTranslate.clearData,
            url : '#',
            position : 'right',
            id: 'actionBtnClearData',
            buttonStyle : 'danger',
            onClick: this.handleClearDataModal,
            disabled: this.props.disabledClearData
          },
        ]
      }
      else {
        return [
          {
            name : commonTranslate.back,
            url : '#',
            position : 'left',
            id: 'actionBtnBack',
            buttonStyle : 'link',
            'url': getSectionLink(this.props.match, this.props.linkTo || 'dashboard')
          },
          {
            name : commonTranslate.saveAndContinue,
            url : '#',
            position : 'right',
            id: 'actionBtnSaveCon',
            buttonStyle : 'primary',
            onClick: this.props.onSaveAndContinue !== undefined ? this.props.onSaveAndContinue : null,
            disabled: this.props.disabledSave
          },
          {
            name : commonTranslate.markAsComplete,
            url : '#',
            position : 'right',
            id: 'actionBtnCom',
            buttonStyle : 'default',
            onClick: this.handleMarkAsComplete
          },
          {
            position: 'right',
            id: 'actionSpacer',
            buttonStyle : 'spacer'
          },
        ]
      }
    }

    if (page === 'complete') {
      return [
        {
          name : '',
          url : '#',
          position : 'left',
          id: 'actionBtnBack',
          buttonStyle : 'link'
        },
        {
          name : commonTranslate.startNextWorkbook,
          onClick: this.handleOnClickNextWorkbook,
          position : 'right',
          id: 'actionBtnSaveCon',
          buttonStyle : 'primary'
        }
      ]
    }

    if (page === 'reviewPage') {
      if (role === "Admin") {
        return [
          {
            name: commonTranslate.back,
            url: getSectionLink(this.props.match, this.props.linkTo || 'dashboard'),
            position : 'left',
            id: 'actionBtnBack',
            buttonStyle : 'link'
          },
          {
            name : commonTranslate.complete,
            onClick: this.props.onClickReviewComplete,
            position : 'right',
            id: 'actionBtnSaveCon',
            buttonStyle : 'primary'
          }
        ]
      }
      else {
        return [
          {
            name: commonTranslate.back,
            url: getSectionLink(this.props.match, this.props.linkTo || 'dashboard'),
            position : 'left',
            id: 'actionBtnBack',
            buttonStyle : 'link'
          }
        ]
      }
    }
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    this.setState({ isShowLoaderModal: false, isShowClearDataModal: false });
  }

  /**
   * method that hide confirmation modal
   */
  handleClearDataModalHide = () => {
    this.setState({ isShowClearDataModal: false });
  }

  handleOnConfirm = (context, action) => {
    if (action === 'yes') {
      this.setState({
        isShowConfirmationModal: false,
        isShowLoaderModal: true,
        loaderStatus: '',
        loaderMessage: commonTranslate.deletingAllRecords,
        isClearData: true
      });
      this.props.dispatch(postClearData(context));
    }else{
      this.setState({ isShowClearDataModal: false })
    }
  }

  render() {
    const {isRedirect, redirectTo, isShowClearDataModal, isShowLoaderModal, loaderStatus, loaderMessage, clearStatus} = this.state;
    if (isRedirect === true) {
      return <Redirect to={redirectTo} />;
    }

    return(
      <Fragment>
        <FooterFormAction footerFormActions={this.getFooterActions()} isClearDataShow={this.props.isClearDataShow}/>

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>

        <Modal show={isShowClearDataModal} onHide={this.handleClearDataModalHide}>
          <ClearDataModal dispatch={this.props.dispatch} title={commonTranslate.clearDataTitle} clearDataMessage={commonTranslate.clearDataMessage} onConfirm={this.handleOnConfirm} />
        </Modal>
      </Fragment>
    );
  }
}

Footer.propTypes = {
  match: PropTypes.object.isRequired,
  linkTo: PropTypes.string,
  onMarkAsComplete: PropTypes.func,
  onSaveAndContinue: PropTypes.func,
  onNextWorkbook: PropTypes.func,
  onClearData: PropTypes.func,
  page: PropTypes.any,
  clearStatus: PropTypes.bool
};

export default Footer;
