import React from 'react';
import ReactDOM from 'react-dom';

import Popover from 'react-popover-component';
import 'react-popover-component/dist/styles.css';

const App = (): JSX.Element => (
  <div style={{display:'inline-block'}}>
    <Popover
      target={(<div>Click me!</div>)}
      arrowPosition="topCenter"
      style={{width: "180px"}}
    >
      Lorem ipsum dolor sit amet.
    </Popover>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('examples')
);
