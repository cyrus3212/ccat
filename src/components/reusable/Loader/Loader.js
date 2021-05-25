import React, { Component } from 'react';
import loading from './loading.svg';

class Loader extends Component {

  render() {

    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: this.props.height || '100vh',
      width: this.props.width || '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: this.props.background || 'white',
      zIndex: 2
    }

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Loader;
