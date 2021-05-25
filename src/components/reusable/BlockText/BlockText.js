import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./_blockText.scss";

class BlockText extends Component {
  markup = (val) => {
		return { __html: val }
	}

  render () {
    const title = this.props.title || 'Title';
    const paragraph = this.props.paragraph || '';

    return (
      <div className="block-text">
        <h4 dangerouslySetInnerHTML={this.markup(title)} />
        <br/>
        <div dangerouslySetInnerHTML={this.markup(paragraph)} />
        <br/>
      </div>
    );
  }

}

BlockText.propTypes = {
  title: PropTypes.string,
  paragraph1: PropTypes.string,
  paragraph2: PropTypes.string,
};

export default BlockText;
