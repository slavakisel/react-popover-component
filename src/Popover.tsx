import * as React from 'react';
import { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import config, { Arrows } from './config';
import TransformCalculator from './transform-calculator';

import { IProps, IState, IViewport } from './types';

class Popover extends Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    children: (<div>{config.warnings.missingContent}</div>),
    arrowPosition: 'bottomCenter',
    hasCloseButton: false,
    hasCancelLink: false,
    style: {},
    open: false,
    toggable: true,
    closeOnOutsideClick: true,
    onClose: undefined
  };

  private container: HTMLDivElement;
  private _transform: TransformCalculator;

  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
  }

  handleClickOutside = (evt): void => {
    if (this.props.closeOnOutsideClick) this.close();
  }

  componentWillReceiveProps(nextProps: IProps): void {
    if('open' in nextProps) {
      this.setState({ open: nextProps.open });
    }
  }

  componentDidMount(): void {
    window.addEventListener('keyup', this.onEscapeKey, false);
    window.addEventListener('resize', this.handleResize);
    this.setState({ viewport: this.viewport() });
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', this.onEscapeKey, false);
    window.removeEventListener('resize', this.handleResize);
  }

  viewport = (): IViewport => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  handleResize = (): void => {
    const viewport = this.viewport();
    this.setState({ viewport });
  }

  onEscapeKey = (e): void => {
    if (e.key === 'Escape') this.close();
  }

  onTargetClick = (): void => {
    if (!this.props.toggable) return;
    this.state.open ? this.close() : this.open();
  }

  onCancelClick = (e): void => {
    e.preventDefault();
    this.close();
  }

  setDefaultArrowClass(): string {
    const { arrowPosition } = this.props;
    return config.popOverStyles[arrowPosition] || config.popOverStyles.default;
  }

  open = (): void => this.setState({ open: true });

  close = (): void => {
    this.setState({ open: false });

    if (this.props.onClose) { this.props.onClose() }
  }

  containerWidth = (): string => {
    return this.container.clientWidth + 'px';
  }

  containerOffsets = (): ClientRect => {
    return this.container.getBoundingClientRect();
  }

  widthInsideViewport = (): string => {
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

  transform = (): TransformCalculator => {
    if (!this._transform) this._transform = new TransformCalculator(this.props.arrowPosition, this.container);

    return this._transform;
  }

  transformStyle = (): string => {
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

  renderCloseButton(): JSX.Element|null {
    if (!this.props.hasCloseButton) return null;

    return (
      <a className="react-popover-close" href="" onClick={this.onCancelClick}>
        <span className="fa fa-close" />
      </a>
    );
  }

  renderCancelLink(): JSX.Element|null {
    if (!this.props.hasCancelLink) return null;

    return (
      <a className="react-popover-cancel" href="" onClick={this.onCancelClick} >
        Cancel
      </a>
    );
  }

  renderPopoverBody(): JSX.Element|null {
    const { children, actionButton } = this.props;

    const arrowClass = this.setDefaultArrowClass();
    if (!this.state.open) return null;

    return (
      <div
        className={`react-popover arrow ${arrowClass}`}
        style={{...this.popoverStyles()}}
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

  setupContainer = (ref): void => {
    if (ref) this.container = ref;
  }

  render(): JSX.Element {
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
