import React from 'react'
import nock from 'nock'

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

  test('it allows outgoing API calls', () => {
    return new Promise(resolve => {
      const wrapper = visit('/async')
      setTimeout(function(){
        expect(wrapper).toIncludeText('IP address')
        resolve()
      }, 1000)
    })
  })

  test('it mocks API calls', () => {
    nock('https://jsonip.com').get('/').reply(
      200,
      {
        ip: "lmaothisisyourip"
      },
      [
        'Content-Type',
        'application/json; charset=utf-8',
        'Access-Control-Allow-Origin',
        '*',
      ]
    )

    return new Promise(resolve => {
      const wrapper = visit('/async')
      setTimeout(function(){
        expect(wrapper).toIncludeText('lmaothisisyourip')
        resolve()
      }, 10) // Any lower and the AJAX callback won't be triggered?!
    })
  })
})
