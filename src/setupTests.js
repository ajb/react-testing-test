import React from 'react'
import App from './App'
import { mount, ReactWrapper } from 'enzyme'
import nock from 'nock'
import 'jest-enzyme'
import $ from 'jquery'

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

ReactWrapper.prototype.navigate = function(path) {
  this.find('Router').prop('history').replace(path)
}

ReactWrapper.prototype.waitForAjax = function() {
  if ($.active === 0) {
    return Promise.resolve()
  } else {
    return new Promise(resolve => {
      let _poll = () => {
        if ($.active === 0) {
          resolve()
        } else {
          setTimeout(_poll, 5)
        }
      }

      _poll()
    })
  }
}

global.visit = function(url) {
  Object.defineProperty(window.location, 'pathname', {
    writable: true
  })

  window.location.pathname = url
  return mount(<App />)
}

afterEach(() => {
  nock.cleanAll()
})
