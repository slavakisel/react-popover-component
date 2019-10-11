import * as React from 'react';
import {PureComponent} from 'react';

import Popover from 'react-popover-component';

class DemoPopover extends PureComponent<any> {
  render() {
    return (
      <div className="demo__wrapper">
        <div className="demo__container">
          <Popover
            target={(<div className="demo__target">Click me!</div>)}
            style={{width: "180px"}}
            {...this.props}
          >
            Lorem ipsum dolor sit amet.
          </Popover>
        </div>
      </div>
    );
  }
}

export default DemoPopover;
