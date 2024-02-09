import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadMoreButton from '@/components/LoadMoreButton.vue'

describe('LoadMoreButton', () => {
  it('calls onClick prop function when clicked', async () => {
    const onClickMock = vi.fn()
    const wrapper = mount(LoadMoreButton, {
      props: {
        isVisible: true,
        onClick: onClickMock
      }
    })
    await wrapper.find('button').trigger('click')
    expect(onClickMock).toHaveBeenCalled()
  })
})
