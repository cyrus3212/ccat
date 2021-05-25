import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_importExportAction.scss';
import { iconType } from '../../../helpers/iconHelper';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import { Link } from 'react-router-dom';

class ImportExportAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderIEAction() {
    const { importExportAction } = this.props

    return importExportAction.map((importExport, index) => {
      const renderIcon = iconType(importExport.icon, importExport.name);

      if (importExport.type === 'export') {
        return (
          <Button
            htmlId={importExport.id}
            key={index}
            buttonStyle={importExport.buttonStyle}
            onClick={importExport.onClick}
            className={`pull-${importExport.position}`}><img src={renderIcon.icon} alt={renderIcon.label}/>{renderIcon.label}
          </Button>
        )
      }

      else if (importExport.type === 'import') {
        return (
          <label className="custom-file-upload" key={index}>
            <input id="input-file" type="file" onChange={importExport.onChange}/>
            <span className="icon-button-container">
              <img src={renderIcon.icon} alt={renderIcon.label}/>{renderIcon.label}
            </span>
          </label>
        )

      }
    })
  }

  render() {
    return (
      <Row className="import-export">
        <Col xs={12} md={12}>
          <div className="multi-button-container">
            <div>{this.renderIEAction()}</div>
          </div>
        </Col>
      </Row>
    );
  }
}


ImportExportAction.propTypes = {
  importExportAction: PropTypes.any,
  uploadHandler: PropTypes.func
};

export default ImportExportAction;
