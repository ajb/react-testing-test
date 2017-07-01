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

ReactWrapper.prototype.waitForAjax = function(maxWait = 1000, pollInterval = 5) {
  if ($.active === 0) {
    return Promise.resolve()
  } else {
    let timePassed = 0

    return new Promise((resolve, reject) => {
      let _poll = () => {
        if ($.active === 0) {
          resolve()
        } else if (timePassed > maxWait) {
          reject(`More than ${maxWait} ms passed while waiting for AJAX calls to complete`)
        } else {
          setTimeout(_poll, pollInterval)
          timePassed += pollInterval
        }
      }

      _poll()
    })
  }
}

global.visit = function(path) {
  // https://github.com/facebook/jest/issues/890#issuecomment-209698782
  Object.defineProperty(window.location, 'pathname', { writable: true })

  window.location.pathname = path
  return mount(<App />)
}

afterEach(() => {
  nock.cleanAll()
})
