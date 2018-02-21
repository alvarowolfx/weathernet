import React, { Component } from 'react';

import withSizes from 'react-sizes';
import throttle from 'lodash.throttle';

class ResizeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: this.getStyle()
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  getStyle() {
    const isMobile = window.innerWidth < 960;
    return {
      width: isMobile ? '100%' : window.innerWidth - 240,
      height: window.innerHeight - 74
    };
  }

  onResize = throttle(() => {
    this.setState({
      style: this.getStyle()
    });
  }, 300);

  render() {
    return <div style={this.state.style}>{this.props.children}</div>;
  }
}

export default ResizeContainer;
