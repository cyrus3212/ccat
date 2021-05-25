import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getSectionLink } from '../../../helpers/routesHelper';
import reviewWorkbookTranslate from '../../../translation/reviewWorkbook'
import BlockText from '../../reusable/BlockText';
import './_reviewSectionPage.scss';
import ReviewWorkbook from '../../reusable/ReviewWorkbook';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { getReviewWorkbook, postCompleteWorkbook } from '../../../api/workbookApi';
import Footer from '../../common/Footer'
import { getLastSection } from '../../../helpers/sectionCodeHelper';
import Modal from 'react-bootstrap/lib/Modal';
import LoaderModal from '../../reusable/LoaderModal';
import ConfirmationModal from '../../reusable/ConfirmationModal';

class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      reviewWorkbook: [],
      isRedirect: false,
      redirectTo: '#',
      onClickComplete: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isShowConfirmationModal: false,
      confirmationMessage: ''
    };

    this.baseState = this.state
  }

  componentDidMount() {
    this.setState(this.baseState);
    const {match} = this.props.match !== undefined ? this.props : {};
    this.props.dispatch(getReviewWorkbook({workbook: match.name, code: match.code, dtid: match.dtid}))
  }

  static getDerivedStateFromProps(nextProps, state) {
    let sections = state.sections;
    let reviewWorkbook = state.reviewWorkbook;
    let loaderStatus = state.loaderStatus;
    let loaderMessage = state.loaderMessage;

    try {
      if (nextProps.sections.data !== state.sections) {
        sections = nextProps.sections.data[0].sections;
        reviewWorkbook = nextProps.sections.data[0];
      }

      if (state.onClickComplete === true) {
        if (nextProps.workbook.isOk === false) {
          loaderStatus = 'error',
          loaderMessage = 'Failed to complete workbook.'
        }
        else {
          loaderStatus =  'success',
          loaderMessage = 'Workbook successfully completed.'
        }
      }

    }
    catch (e) {

    }

    return {
      sections: sections,
      reviewWorkbook: reviewWorkbook,
      loaderStatus: loaderStatus,
      loaderMessage: loaderMessage
    }

  }

  componentDidUpdate(prevProps, prevState) {
    const { loaderStatus } = this.state;
    if (prevState.onClickComplete === true && loaderStatus === 'success') {
      this.setState({
        onClickComplete: false
      });
    }
  }

  handleOnClickReviewComplete = () => {
    const {match} = this.props;
    this.props.dispatch(postCompleteWorkbook({workbook: match.name, enterpriseCode: match.code, dtid: match.dtid}))
    this.setState({
      onClickComplete: true,
      isShowLoaderModal: true,
      loaderMessage: 'Completing Workbook...'
    });
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { loaderStatus } = this.state;
    this.setState({
      isShowLoaderModal: false,
    })

    if (loaderStatus === 'success') {
      this.setState({
        isRedirect: true,
        redirectTo: getSectionLink(this.props.match, 'complete')
      })
    }

  }

  handleShowConfirmationModal = () => {
    this.setState({ isShowConfirmationModal: true });
  }

  handleConfirmationModalHide = () => {
    this.setState({ isShowConfirmationModal: false });
  }

  handleOnConfirm = (action) => {
    if (action === 'yes') {
      this.handleOnClickReviewComplete();
    }

    this.setState({ isShowConfirmationModal: false });
  }

  render() {
    const {sections, reviewWorkbook, isRedirect, redirectTo, loaderStatus, loaderMessage, isShowLoaderModal, isShowConfirmationModal, confirmationMessage} = this.state;
    const {match} = this.props.match !== undefined ? this.props : {};
    let reviewSections = [];

    if (isRedirect === true) {
      return <Redirect to={redirectTo} />;
    }

    if (sections.length > 0) {
      reviewSections = sections;
    }

    return (
      <div className="container-review">
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <BlockText
              title={reviewWorkbookTranslate.reviewWorkbookPageTitle}
              paragraph={reviewWorkbookTranslate.reviewWorkbookPageDesc}
            />
          </Col>
        </Row>
        <ReviewWorkbook
          title={reviewWorkbook.label}
          name={match.name}
          code={match.code}
          dtid={match.dtid}
          sections={reviewSections}
          percentage={reviewWorkbook.completionPercentage}
        />
        <Footer page={`reviewPage`} match={this.props.match} onClickReviewComplete={this.handleShowConfirmationModal} linkTo={getLastSection(match.name)} />

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>

        <Modal show={isShowConfirmationModal} onHide={this.handleConfirmationModalHide}>
          <ConfirmationModal confirmationMessage={confirmationMessage} onConfirm={this.handleOnConfirm}/>
        </Modal>
      </div>
    );
  }
}

ReviewPage.propTypes = {
  sections: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

ReviewPage.displayName = 'Review Page';

export default ReviewPage;
