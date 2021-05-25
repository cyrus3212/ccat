import React, { Fragment, Component } from 'react';
import ModalFormEdify from '../../reusable/ModalFormEdify';
import {generateModalForm} from './FormFields';
import api from '../../../utils/Http';
import PropTypes from 'prop-types';
import Loader from '../../reusable/Loader';

class SectionSelectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: {},
        isAddStatus:"",
        copyAllTogle: false,
        coaOptions: [],
        acnOptions:[],
        sfiOptions:[],
        prtOptions:[],
        srvOptions:[],
        pyrOptions:[],
        options: [],
    };
  }

  componentDidMount() {
    const http = api();
    const coaUrl = this.getWorkbookUrl('CHR');
    http.get(coaUrl).then(res => {
      let coaOptions = res.data.data;
      this.setState({ coaOptions });
    });

    const acnUrl = this.getWorkbookUrl('ACN');
    http.get(acnUrl).then(res => {
      let acnOptions = res.data.data;
      acnOptions.unshift({label: 'All Workbook', value: 'all'});
      this.setState({ acnOptions });
    });

    const sfiUrl = this.getWorkbookUrl('SFI');
    http.get(sfiUrl).then(res => {
      let sfiOptions = res.data.data;
      sfiOptions.unshift({label: 'All Workbook', value: 'all'});
      this.setState({ sfiOptions });
    });

    const prtUrl = this.getWorkbookUrl('PRT');
    http.get(prtUrl).then(res => {
      let prtOptions = res.data.data;
      prtOptions.unshift({label: 'All Workbook', value: 'all'});
      this.setState({ prtOptions });
    });

    const srvUrl = this.getWorkbookUrl('SRV');
    http.get(srvUrl).then(res => {
      let srvOptions = res.data.data;
      srvOptions.unshift({label: 'All Workbook', value: 'all'});
      this.setState({ srvOptions });
    });

    const pyrUrl = this.getWorkbookUrl('PYR');
    http.get(pyrUrl).then(res => {
      let pyrOptions = res.data.data;
      pyrOptions.unshift({label: 'All Workbook', value: 'all'});
      this.setState({ pyrOptions });
    });

  };

  getWorkbookUrl = (workbook) => {
    const { enterpriseCode, resourceData } = this.props.props;
    const { dtid } = resourceData;

    return `Menu/${enterpriseCode}/${dtid}/${workbook}`;
  }

   /**
   * method to handle data input changes
   */
  handleOnChangeModalInput = (event) => {
    const { name, value } = event;

    let data = Object.assign({}, this.state.data);
    data[name] = value;

    if (name === 'copyAllTogle') {
      if (value > 0) {
        this.setState({ copyAllTogle: true});
        this.props.isCopyAllTogle('true');
      } else {
        this.setState({ copyAllTogle: false});
        this.props.isCopyAllTogle('false');
      }
    }

    try {
      if(name){
        value.map((v) => {
          if(v.value === 'all'){
            data[name] = [
              { label: 'All Workbook', value: 'all' }
            ]
          }else{
            data[name] = data[name] = value
            data[name].map((d, index) => {
              if(d.value === 'all') {
                data[name].shift(index);
              }
            })
          }
        })
      }

    } catch(e){

    }

    this.setState({ data });
    this.props.workbookSections(data);
  }

  handleModalGetProps = (data) => {
    this.setState({ data });
  }


  render () {
    const { title } = this.props.props;
    const {data, isAddStatus, copyAllTogle, errorFields, coaOptions, acnOptions, sfiOptions , prtOptions, srvOptions, pyrOptions, isWorkbookSections} = this.state;
    const formFields = generateModalForm(this.handleOnChangeModalInput, copyAllTogle, errorFields, coaOptions, acnOptions, sfiOptions ,prtOptions ,srvOptions, pyrOptions, title, isWorkbookSections);

    let loader = true;
    if((coaOptions.length && acnOptions.length && sfiOptions.length && prtOptions.length && srvOptions.length && pyrOptions.length ) >= 1){
      loader = false;
    }

  return (
    <Fragment>
      {loader !== false ?
        <Loader width={'unset'} height={'unset'}/>
        :
        null
      }
      <ModalFormEdify isModalShowTitle={false} isModalShowAction={false} fields={formFields} data={data} onGetProps={this.handleModalGetProps} isAddStatus={isAddStatus} title=""/>
    </Fragment>
  )
}
}

SectionSelectForm.propTypes = {
  dispatch: PropTypes.func,
  workbooks: PropTypes.object
};

export default SectionSelectForm;
