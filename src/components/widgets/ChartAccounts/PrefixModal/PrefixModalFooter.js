import React, { Fragment } from "react";
import Button from "@coxautokc/fusion-ui-components/lib/Button";

const PrefixModalFooter = ({ onExport, onCloseModal, onClickApply, loaderStatus, responseWarning }) => {
  return (
    <Fragment>
      <div className="dynamic-modal-footer">
        {/* Default buttons state */}
        {loaderStatus === "" ? (
          <Fragment>
            <span />
            <div>
              <Button htmlId="modal-close" bsStyle="link" onClick={onCloseModal}>Close</Button>
              { responseWarning ? <Button htmlId="modal-close" bsStyle="link" onClick={onExport}>Export File</Button> : null}
              <Button htmlId="modal-apply-all" bsStyle="primary" onClick={onClickApply}>Apply</Button>
            </div>
          </Fragment>
        ) : (
          // Loading state
          loaderStatus === "loading" ? (
            <div className={`circle-loader`}>
              <div className="checkmark draw" />
            </div>
          ) : (
            // After loading state
            <Fragment>
              <div className={`circle-loader ${loaderStatus}`}>
                <div className="checkmark draw" />
              </div>
              {/* Check if success complete */}
              {loaderStatus === "success" ? (
                <div>
                  {/* Display Export file button if state has warning */}
                  <Button htmlId="modal-close" bsStyle="link" onClick={onCloseModal}>Close</Button>
                  { responseWarning ? <Button htmlId="modal-close" bsStyle="link" onClick={onExport}>Export File</Button> : null}
                  <Button htmlId="modal-apply-all" bsStyle="primary" onClick={onClickApply}>Apply</Button>
                </div>
              ) : (
                // Display if state has error
                <div>
                  <Button htmlId="modal-close" bsStyle="link" onClick={onCloseModal}>Close</Button>
                  <Button htmlId="modal-apply-all" bsStyle="primary" onClick={onClickApply}>Retry</Button>
                </div>
              )}
            </Fragment>
          )
        )}
      </div>
    </Fragment>
  );
};

export default PrefixModalFooter;
