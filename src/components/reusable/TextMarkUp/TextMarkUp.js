import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./_textMarkUp.scss";

class TextMarkUp extends Component {
  markup = (val) => {
		return { __html: val }
	}

  render () {
    const label = this.props.label || '';
    return (
      <span dangerouslySetInnerHTML={this.markup(label)} />
    );
  }

}

TextMarkUp.propTypes = {
  label: PropTypes.string,
};

export default TextMarkUp;
