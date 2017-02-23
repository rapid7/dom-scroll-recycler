import React, {
  Component,
  PropTypes
} from 'react';

class DomScrollRecycler extends Component {
  static propTypes = {
    onRecyclerDidMount: PropTypes.func,
    className: PropTypes.string,
    items: PropTypes.array,
    itemHeight: PropTypes.number,
    offset: PropTypes.number,
    calculatePositionalValues: PropTypes.func
  };

  static defaultProps = {
    onRecyclerDidMount: () => {}
  }

  constructor(props) {
    super(props);
    this.state = { scrollPosition: 0 };
    this.updateScrollPosition = this.updateScrollPosition.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.props.onRecyclerDidMount(this.refs.container);
  }

  updateScrollPosition(e) {
    this.height = e.target.clientHeight;
    const newScrollPosition = Math.floor(e.target.scrollTop / this.props.itemHeight);
    const change = Math.abs(this.state.scrollPosition - newScrollPosition);
    const recheckInterval = 4;

    if (change >= recheckInterval) {
      this.setState({ scrollPosition: newScrollPosition });
    }
  }

  render() {
    const {
      items,
      itemHeight,
      offset,
      calculatePositionalValues,
      className,
      ...otherProps
    } = this.props;

    let startPosition, endPosition, paddingTop;
    const height = this.height || 500;
    const numberItemsToShow = Math.floor(height / itemHeight) + offset;
    if (calculatePositionalValues) {
      const positionalValues = calculatePositionalValues(numberItemsToShow, this.state.scrollPosition);
      startPosition = positionalValues.startPosition;
      endPosition = positionalValues.endPosition;
      paddingTop = positionalValues.paddingTop
    } else {
      startPosition = this.state.scrollPosition - offset > 0 ? this.state.scrollPosition - offset : 0;
      endPosition = this.state.scrollPosition + numberItemsToShow >= items.length ? items.length : this.state.scrollPosition + numberItemsToShow;
      paddingTop = startPosition * itemHeight;
    }
    const paddingBottom = ((items.length - endPosition) * itemHeight) > 0 ? (items.length - endPosition) * itemHeight : 0;
    const key = className ? 'className' : 'style';
    const value = className || { overflow: 'auto' };
    const stylingProps = {
      [key]: value
    };

    return (
      <div
        ref="container"
        {...stylingProps}
        onScroll={this.updateScrollPosition}
        {...otherProps}
      >
        <div
          key="padding-top"
          style={{ height: paddingTop }}
        ></div>
        {(items.slice(startPosition, endPosition))}
        <div
          key="padding-bottom"
          style={{ height: paddingBottom }}
        ></div>
      </div >
    );
  }
}

export default DomScrollRecycler;
