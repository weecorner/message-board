import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import {NewPostContainer} from './NewPostContainer'

describe('<NewPostContainer />', () => {
  let root
  beforeEach('render the root', () =>
    root = shallow(<NewPostContainer/>)
  )

  it('shows an add new post form', () => {
    expect(root.find('input[name="title"]')).to.have.length(1)
    expect(root.find('input[name="message"]')).to.have.length(1)
    expect(root.find('input[name="user"]')).to.have.length(1)
  })

  it('shows a title field', () => {
    const title = root.find('input[name="title"]')
    expect(title).to.have.length(1)
    expect(title.at(0)).to.have.attr('type').equals('text')
  })

  it('has a create post button', () => {
    const submit = root.find('input[type="submit"]')
    expect(submit).to.have.length(1)
  })

  describe('when submitted', () => {
    const post = spy()
    const root = shallow(<NewPostContainer post={post}/>)
    const submitEvent = {
      preventDefault: spy(),
      target: {
        title: {value: 'First Post'},
        message: {value: 'This is the first post.'},
        user: {value: 'Admin'}
      }
    }

    beforeEach('submit', () => {
      post.reset()
      submitEvent.preventDefault.reset()
      root.simulate('submit', submitEvent)
    })

    it('calls props.post with credentials', () => {
      expect(post).to.have.been.calledWith(
        submitEvent.target.title.value,
        submitEvent.target.message.value,
        submitEvent.target.user.value,
      )
    })

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})
