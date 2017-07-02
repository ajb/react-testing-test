import React from 'react'
import nock from 'nock'
import {browserHistory} from "react-router"

const apiMock = nock('http://mockedapi.com')
                  .defaultReplyHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                  })

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

  test('navigates to other pages programmatically', () => {
    const wrapper = visit('/')
    expect(wrapper.find('h2').text()).toEqual('Home')
    wrapper.navigate('/about')
    expect(wrapper.find('h2').text()).toEqual('About')
  })

  test('it fills forms', () => {
    const wrapper = visit('/form')
    expect(wrapper.find('input[type="text"]')).toHaveValue('Adam')
    wrapper.find('input[type="text"]').fillIn('Foobar')
    wrapper.find('form').simulate('submit')
    expect(wrapper.find('h2').text()).toEqual('Hello, Foobar!')
  })

  test('it mocks API calls', async () => {
    apiMock.get('/users').reply(200, { name: "fake_user_name" })

    const wrapper = visit('/async')
    await wrapper.waitForAjax()
    expect(wrapper).toIncludeText('fake_user_name')
  })

  test('it has a timeout for waitForAjax', async () => {
    apiMock.get('/users').delay(100).reply(404)
    const wrapper = visit('/async')

    let message;
    try {
      await wrapper.waitForAjax(50)
    } catch (err) {
      message = err
    }

    expect(message).toEqual(expect.stringContaining('More than 50 ms passed'))
  })
})
