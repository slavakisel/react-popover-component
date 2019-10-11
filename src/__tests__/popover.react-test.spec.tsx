import * as React from "react";
import { mount } from 'enzyme';
import Popover from '../Popover';

let props = {
  children: React.createElement('p', null, 'popover message'),
  top: '100px',
  left: '200px',
  arrowPosition: 'bottomRight',
  target: React.createElement('button',
    { className: 'btn-delete', onClick: (e) => { e.preventDefault(); } },
    'delete'),
  actionButton: React.createElement('button',
    { className: 'btn-confirm-delete', onClick: () => {} },
    'delete'),
  hasCloseButton: true,
  hasCancelLink: true,
};

const renderComponent = (props) => {
  return mount(<Popover {...props} />);
}

describe('Popover', () => {
  it('renders the popover with hide class applied by default', () => {
    const tree = renderComponent(props);
    expect(tree).toMatchSnapshot();
  });

  it('renders the popover without the hide class when open props is passed in', () => {
    props = { ...props, open: true };
    const tree = renderComponent(props);
    expect(tree).toMatchSnapshot();
  });

  it('renders with different arrowPosition', () => {
    props = { ...props, arrowPosition: 'leftTop' };
    const tree = renderComponent(props);
    expect(tree).toMatchSnapshot();
  });

  describe('popover body transform propery', () => {
    describe('when arrowPosition is topCenter', () => {
      beforeEach(() => {
        props = { ...props, arrowPosition: 'topCenter' };
      });

      it('renders popover with correct transform style', () => {
        const tree = renderComponent(props);
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when arrowPosition is topRight', () => {
      beforeEach(() => {
        props = { ...props, arrowPosition: 'topRight' };
      });

      it('renders popover with correct transform style', () => {
        const tree = renderComponent(props);
        expect(tree).toMatchSnapshot();
      });
    });

    describe('otherwise', () => {
      beforeEach(() => {
        props = { ...props, arrowPosition: 'rightBottom' };
      });

      it('renders popover with correct transform style', () => {
        const tree = renderComponent(props);
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
