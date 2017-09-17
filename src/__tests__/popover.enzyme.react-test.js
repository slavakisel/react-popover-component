import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Popover from '../Popover';

describe('Popover', () => {
  let component;
  let componentProps;
  let wrapper;

  const createTarget = () => (
    React.createElement('button', {
      className: 'btn-delete',
      onClick: (e) => { e.preventDefault(); },
    }, 'delete')
  );

  beforeEach(() => {
    componentProps = {
      children: React.createElement('p', null, 'popover message'),
      target: createTarget(),
    };
  });

  it('does not show the popover by default', () => {
    component = React.createElement(Popover, componentProps);
    wrapper = mount(component);

    expect(wrapper.find('.react-popover').node).toBeFalsy();
  });

  it('shows the popover once the target button is clicked', () => {
    component = React.createElement(Popover, componentProps);
    wrapper = mount(component);

    wrapper.find('.btn-delete').simulate('click');

    expect(wrapper.find('.react-popover').node).toBeTruthy();
  });

  it('includes the actionButton inside the popover and the actionButton can be clicked', () => {
    const onConfirmDeleteClick = sinon.spy();
    componentProps.actionButton = React.createElement('button',
      { className: 'btn-confirm-delete', onClick: onConfirmDeleteClick },
      'delete');

    component = React.createElement(Popover, componentProps);
    wrapper = mount(component);

    wrapper.find('.btn-delete').simulate('click');
    wrapper.find('.btn-confirm-delete').simulate('click');

    expect(wrapper.find('.btn-confirm-delete').closest('.react-popover').length).toBe(1);
    expect(onConfirmDeleteClick.callCount).toBe(1);
  });

  it('has a close button that closes the popover', () => {
    componentProps.hasCloseButton = true;

    component = React.createElement(Popover, componentProps);
    wrapper = mount(component);

    wrapper.find('.btn-delete').simulate('click');
    wrapper.find('.react-popover-close').simulate('click');
    expect(wrapper.find('.react-popover').node).toBeFalsy();
  });

  it('has a cancel link that closes the popover', () => {
    componentProps.hasCancelLink = true;

    component = React.createElement(Popover, componentProps);
    wrapper = mount(component);

    wrapper.find('.btn-delete').simulate('click');
    wrapper.find('.react-popover-cancel').simulate('click');
    expect(wrapper.find('.react-popover').node).toBeFalsy();
  });

  it('can be set to open by default with the open props', () => {
    componentProps.open = true;

    component = React.createElement(Popover, componentProps);
    wrapper = mount(component);

    expect(wrapper.find('.react-popover').node).toBeTruthy();
  });

  it('does not change "open" if there is no "open" in nextProps', () => {
    component = React.createElement(Popover, componentProps);
    wrapper = mount(component);

    wrapper.find('.btn-delete').simulate('click');
    expect(wrapper.find('.react-popover').hasClass('hide')).toBe(false);

    componentProps.arrowPosition = 'topLeft';
    wrapper.setProps(componentProps);

    expect(wrapper.update().find('.react-popover').node).toBeFalsy();
  });
});
