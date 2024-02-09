import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchComponent from '@/components/SearchComponent.vue'

describe('SearchComponent', () => {
  it('emits "search" event with input value on input', async () => {
    const wrapper = mount(SearchComponent)
    const input = wrapper.find('input')
    await input.setValue('Rick')
    await input.trigger('input')
    expect(wrapper.emitted()).toHaveProperty('search')
    expect(wrapper.emitted('search')![0]).toEqual(['Rick'])
  })
})
