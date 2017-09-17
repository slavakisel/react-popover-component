import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import config, { Arrows } from './config';
import TransformCalculator from './transform-calculator';

import { IProps, IState } from './types';

class Popover extends Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    children: (<div>{config.warnings.missingContent}</div>),
    arrowPosition: 'bottomCenter',
    hasCloseButton: false,
    hasCancelLink: false,
    style: {},
    open: false,
    toggable: true,
    closeOnOutsideClick: true
  };

  private container: HTMLDivElement;
  private _transform: TransformCalculator;

  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
  }

  handleClickOutside = evt => {
    if (this.props.closeOnOutsideClick) this.close();
  }

  componentWillReceiveProps(nextProps) {
    if('open' in nextProps) {
      this.setState({ open: nextProps.open });
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onEscapeKey, false);
    window.addEventListener('resize', this.handleResize);
    this.setState({ viewport: this.viewport() });
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onEscapeKey, false);
    window.removeEventListener('resize', this.handleResize);
  }

  viewport = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  handleResize = () => {
    const viewport = this.viewport();
    this.setState({ viewport });
  }

  onEscapeKey = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  onTargetClick = () => {
    if (!this.props.toggable) return;
    this.state.open ? this.close() : this.open();
  }

  onCancelClick = (e) => {
    e.preventDefault();
    this.close();
  }

  setDefaultArrowClass() {
    const { arrowPosition } = this.props;
    return config.popOverStyles[arrowPosition] || config.popOverStyles.default;
  }

  open = () => {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({ open: false });
  }

  containerWidth = () => {
    return this.container.clientWidth + 'px';
  }

  containerOffsets = () => {
    return this.container.getBoundingClientRect();
  }

  widthInsideViewport = () => {
    const { width } = this.props.style;
    const { viewport } = this.state;

    if (!width || !viewport) return this.containerWidth();

    const elementWidth = parseInt(width.replace('px', ''));
    const offsets = this.containerOffsets();

    switch (this.props.arrowPosition) {
      case 'topCenter':
      case 'bottomCenter':
        const elementLeft = this.transform().containerTranslateX();
        const actualWidth = offsets.left + elementLeft + elementWidth / 2;
        if (actualWidth > viewport.width) return this.containerWidth();
        break;
    }

    return width;
  }

  transform = () => {
    if (!this._transform) this._transform = new TransformCalculator(this.props.arrowPosition, this.container);

    return this._transform;
  }

  transformStyle = () => {
    const { left, top } = this.props;

    const x = left ? `translateX(${left})` : this.transform().translateX();
    const y = top ? `translateY(${top})` : this.transform().translateY();

    return `${x} ${y}`;
  }

  popoverStyles() {
    const { style } = this.props;

    if (!this.container) return style;

    style.width = this.widthInsideViewport();

    const transform = this.transformStyle();

    return { ...style, transform };
  }

  renderCloseButton() {
    if (!this.props.hasCloseButton) return null;

    return (
      <a className="react-popover-close" href="" onClick={this.onCancelClick}>
        <span className="fa fa-close" />
      </a>
    );
  }

  renderCancelLink() {
    if (!this.props.hasCancelLink) return null;

    return (
      <a className="react-popover-cancel" href="" onClick={this.onCancelClick} >
        Cancel
      </a>
    );
  }

  renderPopoverBody() {
    const { children, actionButton } = this.props;

    const arrowClass = this.setDefaultArrowClass();
    if (!this.state.open) return null;

    return (
      <div
        className={`react-popover arrow ${arrowClass}`}
        style={this.popoverStyles()}
      >
        <div className="react-popover-wrapper">
          {children}
          <div className={!!actionButton ? "react-popover-cta" : "" }>
            {actionButton}
            {this.renderCancelLink()}
          </div>
          {this.renderCloseButton()}
        </div>
      </div>
    );
  }

  setupContainer = (ref) => {
    if (ref) this.container = ref;
  }

  render() {
    const { className, target } = this.props;

    return (
      <div
        className={`react-popover-container ${className}`}
        ref={this.setupContainer}
      >
        <div className="react-popover-body">
          <div className="react-popover-target-wrapper" onClick={this.onTargetClick}>
            {target}
          </div>
          {this.renderPopoverBody()}
        </div>
      </div>
    );
  }
};

export default onClickOutside(Popover);
