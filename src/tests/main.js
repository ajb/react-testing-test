describe('react app', () => {
  it('renders OK', () => {
    browser.url('/')
    expect(browser.getTitle()).toBe('React App')
  })

  it('changes pages', () => {
    browser.url('/')
    expect(browser.element('h2').getText()).toBe('Home')
    browser.click('[href="/about"]')
    expect(browser.element('h2').getText()).toBe('About')
  })

  it('fills forms', () => {
    browser.url('/form')
    expect(browser.element('input[type="text"]').getValue()).toBe('Adam')
    browser.element('input[type="text"]').setValue('Foobar')
    browser.element('form').submitForm()
    expect(browser.element('h2').getText()).toBe('Hello, Foobar!')
  })

  it('mocks API calls', () => {
    browser.url('/async')
    browser.waitForAjax()
    expect(browser.element('body').getText()).toContain('fake_user_name')
  })
})
