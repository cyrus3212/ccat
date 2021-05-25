import React, { Fragment, Component } from 'react';
import './_importData.scss';
import commonTranslate from '../../../translation/common.json';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import SectionSelectForm from './SectionSelectForm'
import { importData } from '../../../api/dataTransactionApi';

class ImportDataModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isImporting: false,
      selectValue: '',
      destinations: '',
      loaderStatus: '',
      importAllTogle: false,
      workbookMenus: [],
      import: '',
    }

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    let workbookMenus = nextProps.workbookMenus;

    try {
      if (nextProps.destinations.isOk === true) {
        return {
          loaderMessage: 'Import Data Complete',
          loaderStatus : 'success',
          workbookMenus
        }
      }else if (nextProps.destinations.isOk === false) {
        return {
          loaderMessage: nextProps.destinations.errorMessage,
          loaderStatus : 'error',
          workbookMenus
        }
      }
    }catch (e) {
    }

    return {...nextProps, ...state}
  }

  onChange = (targetValue) => {
    const { value } = targetValue;
    this.setState({ selectValue : value });
  }

  onClickRetry = () => {
    this.setState({isImporting: false});
  }

  handleImportAllTogle = (value) => {
    if (value) {
      this.setState({ importAllTogle: value })
    }
  }

  handleWorkbookSections = (value) => {
    // console.log('value', value);
    let workbookList = value.workbooks;
    let workbookCode = [];

    try {
      workbookList.map((workbook) => {
        workbookCode.push(workbook.value);

        if(workbook.value !== 'CHR') {
          this.setState({['value'+workbook.value]: {[workbook.value]:['all']} })
        } else {
          this.setState({['value'+workbook.value]: {[workbook.value]:['CHR_01']} })
        }

      });
    } catch (e) {

    }

  }

  onImportData = () => {
    const { selectValue, importAllTogle, valueCHR, valueACN, valueSFI, valuePRT, valueSRV, valuePYR } = this.state;
    const { dispatch, resourceData, enterpriseCode } = this.props;

    const paramsData = { enterpriseCode: enterpriseCode, dtid: resourceData.dtid, allWorkbooksAndSection: importAllTogle,
      workbooks: {...valueCHR, ...valueACN, ...valueSFI, ...valuePRT, ...valueSRV, ...valuePYR} }

    dispatch(importData({ ...paramsData }, '/stores/ImportFromS3PerSection'));
    this.setState({ isImporting:true, import: 'import', loaderStatus: '', loaderMessage: 'Importing data. Please wait.' });
  }

  render () {
    const { selectValue, isImporting, loaderStatus, loaderMessage, workbookMenus } = this.state;
    const { onClickClose, title } = this.props;

    let isDisabled = true;

    if (selectValue) {
      isDisabled = false;
    }

    return (
      <Fragment>
        <div className="copy-data-wrapper">
          <Modal.Header>
            <Modal.Title>{title+' Data'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} md={12}>
                <p>Please select workbook data to import. if there is an existing data, <br />it will be overwritten.</p>
              </Col>
              <Col xs={12} md={12}>
                <SectionSelectForm
                  props={this.props}
                  isImportAllTogle={this.handleImportAllTogle}
                  workbookMenus={workbookMenus}
                  workbookSections={this.handleWorkbookSections}
                  title={title}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col xs={12} md={12}>
                { isImporting === false && selectValue ? <p className="text-left">{commonTranslate.copyDataToCompany}</p> : null }
                { (isImporting) === false ?
                  null
                  :
                  <div className="alert-modal-body">
                    <div className="text-left">
                      <p className={`text-alert--${loaderStatus}`}>
                        { `${loaderMessage || commonTranslate.copyingData}` }
                      </p>
                    </div>
                  </div>
                }
              </Col>
              <Col xs={6} md={6}>
                { (isImporting) === false ?
                  null :
                  <div className="text-left">
                    <div className={`circle-loader ${loaderStatus}`}>
                      <div className='checkmark draw'></div>
                    </div>
                  </div>
                }
              </Col>
              <Col xs={6} md={6}>
                { loaderStatus === 'success' && (isImporting  === true) ?
                  <div>
                    <Button
                      htmlId="ButtonContinue"
                      buttonStyle="primary"
                      onClick={onClickClose}
                    >
                      Continue
                    </Button>
                  </div>
                  :
                  null
                }
                {
                  loaderStatus === 'error' && (isImporting === true) ?
                  <div>
                    <Button
                      htmlId="ButtonRetry"
                      buttonStyle="danger"
                      onClick={this.onClickRetry}
                    >
                      Retry
                    </Button>
                  </div>
                  :
                  null
                }
                { isImporting === true ? null :
                  <div>
                    <Button
                      htmlId="ButtonClose"
                      buttonStyle="link"
                      onClick={onClickClose}
                    >
                      No
                    </Button>
                    <Button
                      htmlId="ImportDataButton"
                      buttonStyle="primary"
                      onClick={ this.onImportData }
                      // disabled={ title === 'Import' ? isDisabled : null}
                    >
                      Yes
                    </Button>
                  </div>
                }
              </Col>
            </Row>
          </Modal.Footer>
        </div>
      </Fragment>
    )
  }
}

export default ImportDataModal;
