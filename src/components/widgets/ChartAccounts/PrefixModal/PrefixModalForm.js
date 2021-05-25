import React, { Fragment } from "react";
import TextInput from "@coxautokc/fusion-ui-components/lib/TextInput";
import CheckBoxHorizontal from "../../../reusable/CheckBoxHorizontal";

const PrefixModalForm = ({onChange, onChangeChecker, onClear, value, isRemovePrefix}) => {
  return (
    <Fragment>
      <div className="prefixInput">
        <TextInput
          id="filter"
          label="Enter Value"
          displayLabel={true}
          htmlId="filter"
          name="value"
          maxLength={3}
          onChange={onChange}
          value={value}
        />
        {!value ? null : (
          <i
            id="prefix-clear"
            className="fa fa-times-circle"
            onClick={onClear}
          />
        )}
      </div>
      <CheckBoxHorizontal
        inline
        htmlId="remove-prefix"
        field="isRemovePrefix"
        name="isRemovePrefix"
        label="remove-prefix"
        onChange={onChangeChecker}
        options={[
          {
            value: "Y",
            label: "Remove Prefix"
          }
        ]}
        value={isRemovePrefix}
        labelColSize={2}
        InputColSize={4}
      />
    </Fragment>
  );
};

export default PrefixModalForm;
