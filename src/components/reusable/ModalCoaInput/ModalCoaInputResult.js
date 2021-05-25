import React, { Fragment } from 'react';

class ModalCoaInputResult extends React.Component {

  render() {
    const { chartAccountsList, onSelectAccount, onHideResult } = this.props;

    let accountList = chartAccountsList.map((account, i) => {
      return (
        <li
          key={i}
          className="coa-floating-result--item"
          onClick={e => onSelectAccount(account)}
        >
          New Account Number: <b>{account.newAccountNumber}</b>
          <br />
          <span className="sub-info">
            Description: <b>{account.description}</b>
          </span>
        </li>
      );
    });

    return (
      <Fragment>
        <ul className="coa-floating-result">
          {chartAccountsList.length ?
            <Fragment>
              { accountList }
            </Fragment>
          : (
            <li
              className="coa-floating-result--item"
              onClick={onHideResult}
            >
              Account not found
            </li>
          )}
        </ul>
      </Fragment>
    );
  }
}

export default ModalCoaInputResult;
