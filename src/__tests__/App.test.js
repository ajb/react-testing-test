import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

describe('the home page', () => {
  test('renders without crashing', () => {
    const wrapper = visit('/')
  })

  test('navigates to other pages', () => {
    const wrapper = visit('/')
    expect(wrapper.find('h2').text()).toEqual('Home')
    wrapper.findByText('a', 'About').click()
    expect(wrapper.find('h2').text()).toEqual('About')
  })

  test('it fills forms', () => {
    const wrapper = visit('/form')
    expect(wrapper.find('input[type="text"]')).toHaveValue('Adam')
    wrapper.find('input[type="text"]').fillIn('Foobar')
    wrapper.find('form').simulate('submit')
    expect(wrapper.find('h2').text()).toEqual('Hello, Foobar!')
  })
})
