import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

import AnnotationForm from '../AnnotationForm/presenter';
import Remove from '../AnnotationForm/Remove';
import { defaultLabels } from '../../defaults';

describe('<AnnotationForm />', () => {
  const sequence = new Immutable.List('ATTTGCGTCG'.split(''));

  it('renders an annotation form', () => {
    const wrapper = shallow(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        onSubmitDone={() => {}}
        selections={[]}
        updateSelectionTo={() => {}}
      />
    );

    expect(wrapper.find('input[type="submit"]')).to.have.length(1);
    expect(wrapper.find('input[type="number"]')).to.have.length(2);
    expect(wrapper.find('select')).to.have.length(1);
    expect(wrapper.find('textarea')).to.have.length(1);
  });

  it('updates annotation form with selection', () => {
    const selections = [{from: 2, to: 4}];
    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        onSubmitDone={() => {}}
        selections={[]}
        updateSelectionTo={() => {}}
      />
    );

    wrapper.setProps({ selections });

    expect(wrapper.find('input[type="number"][value=3]')).to.have.length(1);
    expect(wrapper.find('input[type="number"][value=5]')).to.have.length(1);
  });

  it('updates annotation form with partial selection', () => {
    const selections = [{from: 2, to: undefined}];
    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
        onSubmitDone={() => {}}
        selections={[]}
      />
    );

    wrapper.setProps({ selections });

    expect(wrapper.find('input[type="number"][value=3]')).to.have.length(1);
    expect(wrapper.find({placeholder:"To", type:"number", value:''})).to.have.length(1);
  });

  it('does not show remove button if no annotation is under edition', () => {
    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
        onSubmitDone={() => {}}
        selections={[]}
      />
    );

    expect(wrapper.find('.remove')).to.have.length(0);
  });

  it('enables position fields if at most one selection', () => {
    const selections = [{ from: 1, to: 2 }];
    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
        onSubmitDone={() => {}}
        selections={[]}
      />
    );

    wrapper.setProps({ selections });

    expect(wrapper.state('disablePositions')).to.be.false;
  });

  it('disables position fields if more than one selection', () => {
    const selections = [{ from: 1, to: 2}, { from: 1, to: 2 }];
    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
        onSubmitDone={() => {}}
        selections={[]}
      />
    );

    wrapper.setProps({ selections });

    expect(wrapper.state('disablePositions')).to.be.true;
  });

  it('shows remove button if an annotation is under edition', () => {
    const selections = [{from: 10, to: 20}];
    const current = {
      labelId: 123,
      annotationId: 456,
      annotation: {
        positionFrom: 10,
        positionTo: 20,
        comment: '',
      }
    };

    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
        onSubmitDone={() => {}}
        selections={[]}
      />
    );

    wrapper.setProps({
      current,
      selections
    });

    expect(wrapper.find('.remove')).to.have.length(1);
  });

  it('displays the Remove component on "remove" button click', () => {
    const selections = [{from: 10, to: 20}];
    const current = {
      labelId: 123,
      annotationId: 456,
      annotation: {
        positionFrom: 10,
        positionTo: 20,
        comment: '',
      }
    };

    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
        onSubmitDone={() => {}}
        selections={[]}
      />
    );

    wrapper.setProps({
      current,
      selections
    });

    expect(wrapper.find('.remove')).to.have.length(1);
    expect(wrapper.find(Remove)).to.have.length(0);

    wrapper.find('.remove').simulate('click');

    expect(wrapper.find(Remove)).to.have.length(1);
  });

  it('should call onSubmit N times, but onSubmitDone once', () => {
    const selections = [
      {from: 1, to: 2},
      {from: 10, to: 20},
    ];
    const spyOnSubmit = sinon.spy();
    const spyOnSubmitDone = sinon.spy();

    const wrapper = shallow(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={spyOnSubmit}
        onSubmitDone={spyOnSubmitDone}
        selections={[]}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    wrapper.setProps({
      current: null,
      selections
    });

    const e = { preventDefault: () => {} };

    wrapper.instance().onSubmit(e);

    expect(spyOnSubmit.calledTwice).to.be.true;
    expect(spyOnSubmitDone.calledOnce).to.be.true;
  });
});