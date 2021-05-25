import React, { Fragment } from "react";
import BlockText from "../../../reusable/BlockText";
import IconInfoOutline from '@coxautokc/fusion-ui-components/lib/Icons/IconInfoOutline';
import chartAccountsTranslate from '../../../../translation/chartAccounts/reviewAccounts.json';

const PrefixModalHint = ({ loaderStatus, loaderMessage, responseWarning, responseWarningRecordCount }) => {
  return (
    <Fragment>
      {loaderStatus ? <p>{loaderMessage}</p> : null}
      {!responseWarning ? null :
        <div className="dynamic-warning">
          <IconInfoOutline className="prefix-warning-icon text-alert--red"/>
          <BlockText
          title=' '
          paragraph={`<b><span class="text-alert--primary">${responseWarningRecordCount} records</span></b> ${chartAccountsTranslate.warningPrefix}`}
          />
        </div>
      }
    </Fragment>
  );
};

export default PrefixModalHint;
