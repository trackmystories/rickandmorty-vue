import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CharacterCard from '../CharacterCard.vue'

describe('CharacterCard', () => {
  let wrapper

  const characterMock = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'image-url'
  }

  beforeEach(() => {
    wrapper = mount(CharacterCard, {
      props: {
        character: characterMock
      }
    })
  })

  it('renders character information', () => {
    expect(wrapper.text()).toContain(characterMock.name)
    expect(wrapper.text()).toContain(characterMock.status)
    expect(wrapper.text()).toContain(characterMock.species)
    expect(wrapper.find('img').attributes('src')).toBe(characterMock.image)
  })

  it('toggles favorite status when favorite button is clicked', async () => {
    await wrapper.find('.favorite-btn').trigger('click')
  })
})
