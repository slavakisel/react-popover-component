import * as React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';

import 'react-popover-component/dist/styles.css';
import './Styles.scss';

import ArrowPositionSettings from './components/settings/ArrowPositionSettings';
import DemoPopover from './components/DemoPopover';

interface IProps {};
interface IState {
  // target: JSX.Element,
  // children: JSX.Element|JSX.Element[],
  // top: string,
  // left: string,
  arrowPosition: string,
  // actionButton: JSX.Element,
  // hasCloseButton: boolean,
  // hasCancelLink: boolean,
  open: boolean,
  // style: {
  //   width?: string
  // },
  // toggable: boolean,
  // closeOnOutsideClick: boolean,
  // className: string,
  key: number,
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      arrowPosition: 'bottomCenter',
      open: true,
      key: Date.now(),
    }
  }

  popover(): JSX.Element {
    return <DemoPopover {...this.state} />;
  };

  settings(): JSX.Element {
    return (
      <div>
        <ArrowPositionSettings
          value={this.state.arrowPosition}
          onChange={arrowPosition => this.setState({ arrowPosition, key: Date.now() })} />
      </div>
    )
  }

  render(): JSX.Element {
    return (
      <div>
        {this.settings()}
        {this.popover()}
      </div>
    );
  };
}

ReactDOM.render(
  <App />,
  document.getElementById('examples')
);
