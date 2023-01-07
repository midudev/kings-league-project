import { mount, test, expect, jest } from 'vitest'
import Logo from './Logo.astro'
import App from './App.astro'

test('Logo component is imported and rendered correctly', async () => {
  const wrapper = mount(Logo)
  expect(wrapper.html()).toContain('<svg')
})

test('menu array is being mapped to the correct elements in the DOM', async () => {
  const wrapper = mount(App)
  const menuItems = wrapper.findAll('li')
  expect(menuItems.length).toBe(5)
  expect(menuItems.at(0).text()).toBe('Equipos')
  expect(menuItems.at(1).text()).toBe('Calendario')
  expect(menuItems.at(2).text()).toBe('Estadísticas')
  expect(menuItems.at(3).text()).toBe('Contacto')
  expect(menuItems.at(4).text()).toBe('Reglamento')
})

test('teams array is being fetched and mapped to the correct elements in the DOM', async () => {
  const wrapper = mount(App)
  // mock the fetch function to return a fake response
  global.fetch = jest.fn().mockResolvedValue({
    json: () => [{ id: 1, image: '/team1.png', name: 'Team 1' }, { id: 2, image: '/team2.png', name: 'Team 2' }]
  })
  // trigger a re-render of the component
  wrapper.setProps({})
  await wrapper.vm.$nextTick()
  const teamItems = wrapper.findAll('li')
  expect(teamItems.length).toBe(8)
  expect(teamItems.at(0).find('a').attributes().title).toBe('Team 1')
  expect(teamItems.at(1).find('a').attributes().title).toBe('Team 2')
})

test('Astro.url.pathname is being used correctly', async () => {
	const wrapper = mount(App)
	// mock the Astro.url.pathname property
	wrapper.vm.$url = { pathname: '/contacto' }
	// trigger a re-render of the component
	wrapper.setProps({})
	await wrapper.vm.$nextTick()
	const menuItems = wrapper.findAll('li')
	expect(menuItems.at(3).find('a').classes()).toContain('opacity-100')
	expect(menuItems.at(3).find('a').classes()).toContain('underline')
	expect(menuItems.at(3).find('a').classes()).toContain('pointer-events-none')
})

test('fetch function is being called with the correct API endpoint', async () => {
	mount(App)
	expect(global.fetch).toHaveBeenCalledWith('https://api.kingsleague.dev/teams')
})
