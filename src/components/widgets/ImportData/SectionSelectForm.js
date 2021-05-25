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
        importAllTogle: false,
        coaOptions: [],
        acnOptions:[],
        sfiOptions:[],
        prtOptions:[],
        srvOptions:[],
        pyrOptions:[],
        options: [],
        workbookList: []
    };
  }

  componentDidMount() {
    const http = api();

    const workbookList = this.getWorkbookUrl();
    http.get(workbookList).then(res => {
      this.setState({ workbookList: res.data.data })
    })
  };

  getWorkbookUrl = () => {
    const { enterpriseCode, resourceData } = this.props.props;
    const { dtid } = resourceData;

    return `Menu/${enterpriseCode}/${dtid}`;
  }

   /**
   * method to handle data input changes
   */
  handleOnChangeModalInput = (event) => {
    const { name, value } = event;

    let data = Object.assign({}, this.state.data);
    data[name] = value;

    if (name === 'importAllTogle') {
      if (value > 0) {
        this.setState({ importAllTogle: true});
        this.props.isImportAllTogle('true');
      } else {
        this.setState({ importAllTogle: false});
        this.props.isImportAllTogle('false');
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
    const {data, isAddStatus, importAllTogle, errorFields, coaOptions, acnOptions, sfiOptions , prtOptions, srvOptions, pyrOptions, isWorkbookSections, workbookList} = this.state;
    const formFields = generateModalForm(this.handleOnChangeModalInput, importAllTogle, errorFields, coaOptions, acnOptions, sfiOptions ,prtOptions ,srvOptions, pyrOptions, title, isWorkbookSections, workbookList);

    let loader = true;
    if((workbookList.length) >= 1){
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
