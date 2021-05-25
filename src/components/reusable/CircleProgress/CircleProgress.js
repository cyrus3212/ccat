import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./_circleProgress.scss";

class CircleProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initPercentage: 0
    };
  }

  setPercentage = () => {
    const { percentage } = this.props
    const { initPercentage } = this.state

    this.setState({
      initPercentage: percentage
    })

    if (initPercentage >= percentage) {
      clearInterval(this.percentageInterval);
    }
  }

  componentDidMount() {
    this.percentageInterval = setInterval(this.setPercentage, 1400);
  }

  render() {
    const { percentage, diameter, strokeWidth, strokeColor, animation } = this.props
    const { initPercentage } = this.state
    const diameters = diameter || 80
    const strokeColors = strokeColor || '#2765c9'
    const defaultStrokeWidth = strokeWidth || 4
    const radius = (diameters - defaultStrokeWidth) / 2;
    const viewBox = `0 0 ${diameters} ${diameters}`
    const dashArray = radius * Math.PI * 2
    let dashOffset = dashArray - dashArray * (animation == false ? percentage : initPercentage) / 100;

    return (
      <svg
          width={diameters}
          height={diameters}
          viewBox={viewBox}>
          <circle
            className="circle-background"
            cx={diameters / 2}
            cy={diameters / 2}
            r={radius}
            strokeWidth={`${defaultStrokeWidth}px`}
          />
          <circle
            className="circle-progress"
            cx={diameters / 2}
            cy={diameters / 2}
            r={radius}
            strokeWidth={`${defaultStrokeWidth}px`}
            transform={`rotate(-90 ${diameters / 2} ${diameters / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
              stroke: strokeColors
            }}
          />
          <text className="circle-text" x="50%" y="50%" dy=".3em" textAnchor="middle">
            {`${percentage || 0}%`}
          </text>
      </svg>
    );
  }
}

CircleProgress.defaultProps = {

};

CircleProgress.propTypes = {
  strokeColor: PropTypes.any,
  diameter: PropTypes.number,
  percentage: PropTypes.any,
  strokeWidth: PropTypes.number,
  animation: PropTypes.bool
};

export default CircleProgress;
