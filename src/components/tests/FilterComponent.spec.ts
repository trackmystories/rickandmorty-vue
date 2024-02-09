import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterComponent from '@/components/FilterComponent.vue'

describe('FilterComponent', () => {
  it('emits "filter" event with filters on button click', async () => {
    const wrapper = mount(FilterComponent)
    const statusSelect = wrapper.findAll('select').at(0)
    const speciesInput = wrapper.findAll('input').at(0)
    const typeInput = wrapper.findAll('input').at(1)
    const genderSelect = wrapper.findAll('select').at(1)

    await statusSelect.setValue('alive')
    await speciesInput.setValue('Human')
    await typeInput.setValue('Type A')
    await genderSelect.setValue('male')

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('filter')
    const filterEvent = wrapper.emitted('filter')[0][0]
    expect(filterEvent).toEqual({
      status: 'alive',
      species: 'Human',
      type: 'Type A',
      gender: 'male'
    })
  })
})
