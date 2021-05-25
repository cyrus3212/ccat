import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockText from '../../../reusable/BlockText';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import Modal from 'react-bootstrap/lib/Modal';
import enterpriseTranslate from '../../../../translation/enterprise.json';
import dealergroupTranslate from '../../../../translation/dealergroup.json';
import commonTranslate from '../../../../translation/common.json';
import { Link } from 'react-router-dom';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { getEnterprise, removeEnterprise } from '../../../../api/enterpriseApi';
import TableEdify from '../../../reusable/TableEdify';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enterprises : [],
      isShowDeleteModal: false,
      enterpriseDeleteId: {},
      isRedirect: false,
      isReload: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getEnterprise());
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      if (nextProps.enterprises.data.length > 0) {
        return {
          enterprises: nextProps.enterprises.data
        };
      }
      else {
        return {
          isRedirect: true
        };
      }
    }
    catch (e) {
      return null;
    }

  }

  componentDidUpdate(prevProps) {
    if (this.state.isReload) {
      this.setState({ isReload: false });
      this.componentDidMount()
    }
  }

  handleShowErrorModal = (enterprise) => {
    this.setState({ enterpriseDeleteId: enterprise, isShowDeleteModal: true });
  }

  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  }

  handleRowDel = (enterprise) => {
    this.setState({ isReload: true, isShowDeleteModal: false });
    this.props.dispatch(removeEnterprise(this.state.enterpriseDeleteId.id)).then(rest => {
      this.componentDidMount();
    });
  };

  handleEnterpriseTable = (evt) => {
    let item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };

    let enterprises = this.state.enterprises.slice();
    let newEnterprise = enterprises.map(function(enterprise) {

      for (let key in enterprise) {
        if (key === item.name && enterprise.id === item.id) {
          enterprise[key] = item.value;
        }
      }

      return enterprise;
    });

    this.setState({enterprises:newEnterprise});
  };

  render() {
    const columns = [
      {
        title: enterpriseTranslate.enterpriseCode,
        dataIndex: 'enterpriseCode',
        type: "label"
      },
      {
        title: enterpriseTranslate.description,
        dataIndex: 'description',
        type: "label"
      },
      {
        title: '',
        dataIndex: 'extraData',
        columnSortable: false,
        type: "actionButtons",
        actionButtons: [
          {
            htmlId: "ViewWorkbookButton",
            buttonStyle: "primary",
            className: "btn btn-primary",
            text: commonTranslate.companyDetails,
            exact: true,
            param: 'enterpriseCode',
            url: "/setup/enterprises/edit/",
            type: "link",
          },
          {
            htmlId: "ViewWorkbookButton",
            buttonStyle: "primary",
            className: "btn btn-primary",
            text: commonTranslate.setupUsers,
            exact: true,
            param: 'enterpriseCode',
            url: "/configure/",
            type: "link",
          },
          {
            htmlId: "deleteButton",
            buttonStyle: "danger",
            className: "table-delete-button",
            text: commonTranslate.delete,
            isDisabled: this.handleDisabledDeleteButton,
            onClick: this.handleShowErrorModal,
            type: "button",
          }
        ]
      },
    ]

    return (
      <div>
        <BlockText
          title={enterpriseTranslate.welcomeWizard}
          paragraph={enterpriseTranslate.aboutSetupEnterprise}
        />
        <React.Fragment>
          <Row>
            <Col md={12}>
              <TableEdify data={this.state.enterprises} tableTitle="Enterprise List" columns={columns} htmlId="enterpriseList" scrollY={650} scrollX={630} />
            </Col>
          </Row>

          <Row>
            <Col md={12} className="add-row-button">
              <Link className="icon-link-button" id="addEnterprise" to="/setup/enterprises/add">
                <i className="fas fa-plus" /> {enterpriseTranslate.addEnterprise}
              </Link>
            </Col>
          </Row>
        </React.Fragment>

        <Modal show={this.state.isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onClick={this.handleRowDel} onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>
      </div>
    );
  }

}

Page.propTypes = {
  enterprises: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};
Page.displayName = '[Enterprise Page] - List';

export default Page;
