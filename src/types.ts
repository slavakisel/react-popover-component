export interface IProps {
  /**
   * The target that opens the Popover ie. button element.  The Popover will be positioned
   * relative to the Popover
   */
  target: JSX.Element,
  /**
   * The content for the Popover
   */
  children: JSX.Element|JSX.Element[],
  /**
   * Any translation of the popover in the Y direction relative to the target
   */
  top: string,
  /**
   * Any translation of the popover in the X direction relative to the target
   */
  left: string,
  /** TODO: strict props
   * position of the arrow around the popover
   */
  arrowPosition: string,
  /**
   */
  actionButton: JSX.Element,
  /**
   * Whether to include a Close button to dismiss the popover
   */
  hasCloseButton: boolean,
  /**
   * Whether to include a Cancel link to dismiss the popover
   */
  hasCancelLink: boolean,
  /**
   * Set the Popover to open
   */
  open: boolean,
  /**
   * Add user defined style
   */
  style: {
    width?: string
  },
  /**
   * Default: true
   * Should popover open/close state be toggable on target click
  */
  toggable: boolean,
  /**
   * Default: true
   * Should popover be closed on click outside the popover
  */
  closeOnOutsideClick: boolean,
  /**
   * Default: void
   * Additional css class to apply on the whole component
  */
  className: string,
};

export interface IViewport {
  width: number,
  height: number
}

export interface IState {
  open: boolean,
  viewport?: IViewport
};
