import React from 'react'
import App from './App'
import { mount, ReactWrapper } from 'enzyme'
import nock from 'nock'
import 'jest-enzyme'

Object.defineProperty(window.location, 'pathname', {
  writable: true
})

ReactWrapper.prototype.findByText = function(selector, text) {
  return this.find(selector).findWhere((node) => {
    return node.text().includes(text)
  })
}
ReactWrapper.prototype.fillIn = function(value) {
  this.simulate('change', { target: { value: value } })
}

ReactWrapper.prototype.click = function() {
  this.simulate('click', { button: 0 })
}

global.visit = function(url) {
  window.location.pathname = url
  const wrapper = mount(<App />)
  return wrapper
}

afterEach(() => {
  nock.cleanAll()
})
