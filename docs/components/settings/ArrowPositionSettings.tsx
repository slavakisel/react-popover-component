import React, { Component } from 'react';
import {Arrows} from '../../../src/config';

import './Styles.scss';

interface IProps {
  value: string;
  onChange: (value: string) => any;
};

interface IState {
  value: string;
}

class ArrowPositionSettings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { value: props.value }
  };

  onChange = (value): void => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render(): JSX.Element {
    return (
      <div className="arrow-settings">
        {
          Arrows.map((a, i) => (
            <button key={i}
              className={a == this.state.value ? "active" : ""}
              onClick={() => this.onChange(a)}>
              {a}
            </button>
          ))
        }
      </div>
    )
  }
};

export default ArrowPositionSettings;
