import React from 'react';
import '../_enterpriseWidget.scss';
import enterpriseTranslate from '../../../../translation/enterprise.json';
import EnterpriseSearchInput from '../../../reusable/EnterpriseSearchInput';

const EnterpriseDetailForm = ({onChangeEnterpriseForm, code, description, onSelectEnterprise, messageType, disabledSearchInput, messageAlert }) => {
  return (
    <div className="custom-form-control custom-form-control--inline ">
      <div className="input-container ">
        <label>{enterpriseTranslate.enterpriseCode}: </label>
        <EnterpriseSearchInput
          enterpriseCode={code}
          onChange={onChangeEnterpriseForm}
          onSelectEnterprise={onSelectEnterprise}
          messageType={messageType}
          isDisabled={disabledSearchInput}
        />
        { messageType === 'error' ?
          <span className="text-alert--red enterprise-error-message">{' '} {messageAlert}</span>
        : null
        }
      </div>
      <div className="input-container">
        <label>{enterpriseTranslate.description}: </label>
        <textarea
          className="textInput"
          name="description"
          value={description}
          onChange={onChangeEnterpriseForm}
          placeholder={enterpriseTranslate.enterpriseDescPlaceHolder}
        ></textarea>
      </div>
    </div>
  );
}

export default EnterpriseDetailForm;
