import React, { Fragment, Component } from 'react';
import './_copyOrExportData.scss';
import commonTranslate from '../../../translation/common.json';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import SelectInputHorizontal from '../../reusable/SelectInputHorizontal';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import SectionSelectForm from './SectionSelectForm'
import { copyOrExportData } from '../../../api/dataTransactionApi';
import api from '../../../utils/Http';

class CopyOrExportDataModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCopying: false,
      isExporting: false,
      selectValue: '',
      destinations: '',
      loaderStatus: '',
      copyAllTogle: false,
      workbookMenus: [],
      copyOrExport: '',
      dependencyInfoMsg: [],
      labelCHR: [],
      labelACN: [],
      labelSFI: [],
      labelPRT: [],
      labelSRV: [],
      labelPYR: [],
    }

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    let workbookMenus = nextProps.workbookMenus;

    try {
      if (nextProps.destinations.isOk === true) {
        return {
          loaderMessage: state.copyOrExport === 'copy' ? commonTranslate.copyDataComplete : 'Export Data Complete',
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
    this.setState({isCopying: false, isExporting: false});
  }

  handleCopyAllTogle = (value) => {
    if (value) {
      this.setState({ copyAllTogle: value })
    }
  }

  handleErrMsg = () => {
    const { labelCHR, labelACN, labelSFI, labelPRT, labelSRV, labelPYR } = this.state;

    return(
      <Fragment>
        {(labelCHR.length || labelACN.length || labelSFI.length || labelPRT.length || labelSRV.length || labelPYR.length) > 0 ?
          <div className="message-caption pull-left text-left">The selected workbook section has data dependency with the following workbook section or page:</div> : null
        }
        {labelCHR.length > 0 ? <strong className="message-info pull-left text-left"><div className="workbook-label">Chart of Accounts:</div> <div className="dependency text-danger">{_.uniq(labelCHR).join( ',  ' )}</div></strong> : null }
        {labelACN.length > 0 ? <strong className="message-info pull-left text-left"><div className="workbook-label">Accounting:</div> <div className="dependency text-danger">{_.uniq(labelACN).join( ',  ' )}</div></strong> : null }
        {labelSFI.length > 0 ? <strong className="message-info pull-left text-left"><div className="workbook-label">Sales and F&I:</div> <div className="dependency text-danger">{_.uniq(labelSFI).join( ',  ' )}</div></strong> : null }
        {labelPRT.length > 0 ? <strong className="message-info pull-left text-left"><div className="workbook-label">Parts:</div> <div className="dependency text-danger">{_.uniq(labelPRT).join( ',  ' )}</div></strong> : null }
        {labelSRV.length > 0 ? <strong className="message-info pull-left text-left"><div className="workbook-label">Service:</div> <div className="dependency text-danger">{_.uniq(labelSRV).join( ',  ' )}</div></strong> : null }
        {labelPYR.length > 0 ? <strong className="message-info pull-left text-left"><div className="workbook-label">Payroll:</div> <div className="dependency text-danger">{_.uniq(labelPYR).join( ',  ' )}</div></strong> : null }
      </Fragment>
    )
  }

  handleWorkbookSections = (value) => {
    const http = api();
    const { resourceData, enterpriseCode } = this.props;

    http.get(`Menu/${enterpriseCode}/${resourceData.dtid}`).then(res => {
      const { data } = res.data;
      const workbooks = data;

      workbooks.map((workbook) => {
        if (value[workbook.value]) {

          let workbookCode = workbook.value;
          let parent = [];
          workbookCode = [];

          value[workbook.value].map((code, i) => {
            workbookCode.push(code.value);

            try {
              if(code.dependencyInfo.length > 0){
                for(i=0; i < code.dependencyInfo.length; i++) {
                  parent.push(code.dependencyInfo[i].sectionLabel);
                }
              }
            } catch(e) {

            }
          });


          this.setState({ ['label'+workbook.value]:parent });
          this.setState({ ['value'+workbook.value]: {[workbook.value]: workbookCode} });
          // const parentObj = _.uniq(parent);
          // this.handleParseParent({workbookCode:workbook.value, parentObj:parentObj});
        }
      })
    });
  }

  onExportData = () => {
    // const http = api("settings");
    // const { resourceData, enterpriseCode } = this.props;
    // const { copyAllTogle } = this.state;

    // if(copyAllTogle === 'true'){
    //   this.setState({ isExporting:true, loaderStatus: '', loaderMessage: 'Exporting Data to DMS. Please wait.' });

    //   http.get(`/  s/ExportToS3/${enterpriseCode}/${resourceData.dtid}`).then(res => {
    //     let result = res.data;
    //     if (result.isOk === true) {
    //       this.setState({
    //         loaderStatus: "success" ,
    //         loaderMessage: 'Export data successful.'
    //       })
    //     } else {
    //       this.setState({
    //         loaderStatus: "error" ,
    //         loaderMessage: 'Export data failed.'
    //       })
    //     }
    //   }).catch(err => {
    //     alert('Err');
    //   });

    // }else{
    //   console.log('API Export per section required');
    // }
    const { copyAllTogle, valueCHR, valueACN, valueSFI, valuePRT, valueSRV, valuePYR } = this.state;
    const { dispatch, resourceData, enterpriseCode } = this.props;

    const paramsData = { enterpriseCode: enterpriseCode, dtid: resourceData.dtid, allWorkbooksAndSection: copyAllTogle,
      workbooks: {...valueCHR, ...valueACN, ...valueSFI, ...valuePRT, ...valueSRV, ...valuePYR} }
    dispatch(copyOrExportData({ ...paramsData }, '/Stores/ExportToS3PerSection'))
    this.setState({ isCopying:true, copyOrExport: 'export', loaderStatus: '', loaderMessage: 'Exporting data. Please wait.' });
  }

  onCopyData = () => {
    const { selectValue, copyAllTogle, valueCHR, valueACN, valueSFI, valuePRT, valueSRV, valuePYR } = this.state;
    const { dispatch, resourceData, enterpriseCode } = this.props;

    const paramsData = { enterpriseCode: enterpriseCode, sourceDTID: resourceData.dtid, DestinationDTID:selectValue, copyAllWorkbooksAndPages: copyAllTogle,
      workbooks: {...valueCHR, ...valueACN, ...valueSFI, ...valuePRT, ...valueSRV, ...valuePYR} }
    dispatch(copyOrExportData({ ...paramsData }, '/Stores/CopyDataPerSection'));
    this.setState({ isCopying:true, copyOrExport: 'copy', loaderStatus: '', loaderMessage: 'Copying data. Please wait.' });
  }

  renderMenuItems() {
    const { stores, resourceData } = this.props;

    if (stores !== undefined) {
      let storeOptions = [];
      stores.map((store, index) => {
        if ((store.statusText === "Created" || store.statusText === "Imported" || store.statusText === "In-progress") && store.dtid !== resourceData.dtid) {

          // if (store.dtid !== selectValue) {
            storeOptions.push({ label: store.companyNumber+' - '+store.name, value: store.dtid });
          // }
        }
      })
      return storeOptions;
    }
  }

  render () {
    const { selectValue, isCopying, isExporting, loaderStatus, loaderMessage, workbookMenus } = this.state;
    const { onClickClose, resourceData, title } = this.props;
    const destinationOptions = this.renderMenuItems();
    const dependencyMessage = this.handleErrMsg();

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
              <Col xs={12} md={6}>
                <TextInput
                  htmlId="companyNumber"
                  label="Company Number"
                  name="companyNumber"
                  maxLength={3}
                  value={resourceData.companyNumber || ''}
                  disabled={true}
                  onChange={this.onChange}
                />
              </Col>
              <Col xs={12} md={6}>
                <TextInput
                  htmlId="companyName"
                  label="Company Name"
                  name="companyName"
                  maxLength={30}
                  value={resourceData.name || ''}
                  disabled={true}
                  onChange={this.onChange}
                />
              </Col>
              {title === 'Export' ? null :
              <Col xs={12} md={12}>
                <SelectInputHorizontal
                  id={'refId'}
                  label={'Destination'}
                  name={'destination'}
                  field={'destination'}
                  displayLabel={false}
                  onChange={this.onChange}
                  value={selectValue || ""}
                  options={destinationOptions || []}
                  labelColSize={12}
                  InputColSize={12}
                />
              </Col>
              }

              <Col xs={12} md={12}>
                <div className="sectionSelectWrapper">
                  <SectionSelectForm
                    props={this.props}
                    isCopyAllTogle={this.handleCopyAllTogle}
                    workbookMenus={workbookMenus}
                    workbookSections={this.handleWorkbookSections}
                    title={title}
                  />
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col xs={12} md={12}>
                { isCopying === false && selectValue ? <p className="text-left">{commonTranslate.copyDataToCompany}</p> : null }
                { (isCopying || isExporting) === false ?
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
              <Col md={12}>
                {dependencyMessage}
              </Col>
              <Col xs={6} md={6}>
                { (isCopying || isExporting) === false ?
                  null :
                  <div className="text-left">
                    <div className={`circle-loader ${loaderStatus}`}>
                      <div className='checkmark draw'></div>
                    </div>
                  </div>
                }
              </Col>
              <Col xs={6} md={6}>
                { loaderStatus === 'success' && (isCopying === true || isExporting === true) ?
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
                  loaderStatus === 'error' && (isCopying === true || isExporting === true) ?
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
                { isCopying === true || isExporting === true ? null :
                  <div>
                    <Button
                      htmlId="ButtonClose"
                      buttonStyle="link"
                      onClick={onClickClose}
                    >
                      No
                    </Button>
                    <Button
                      htmlId="CopyDataButton"
                      buttonStyle="primary"
                      onClick={ title === 'Copy' ? this.onCopyData : this.onExportData }
                      disabled={ title === 'Copy' ? isDisabled : null}
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

export default CopyOrExportDataModal;
