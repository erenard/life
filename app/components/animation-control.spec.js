import { describe, beforeEach, test, expect, jest } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import AnimationControl from './animation-control.vue'

describe('AnimationControl', () => {
  const animation = {
    mainLoop: jest.fn()
  }

  let wrapper

  async function createWrapper (value = false) {
    wrapper = shallowMount(AnimationControl, {
      propsData: {
        animation,
        value
      }
    })
    await wrapper.vm.$nextTick()
  }

  describe('when mounted', () => {
    beforeEach(async () => {
      await createWrapper()
    })

    test('should emit input(true)', () => {
      expect(wrapper.emitted('input')[0]).toEqual([true])
    })
  })

  describe('when the animation is started', () => {
    beforeEach(async () => {
      await createWrapper(true)
    })

    test('should display Pause', () => {
      expect(wrapper.find('.ui__play-pause__button').text()).toEqual('Pause')
    })

    test('should emit "stop" when hitting the pause button', () => {
      wrapper.find('.ui__play-pause__button').trigger('click')
      expect(wrapper.emitted('input')[1]).toEqual([false])
    })
  })

  describe('when the animation is stopped', () => {
    beforeEach(async () => {
      await createWrapper()
    })

    test('should display Resume', () => {
      expect(wrapper.find('.ui__play-pause__button').text()).toEqual('Resume')
    })

    test('should emit "start" when hitting the resume button', () => {
      wrapper.find('.ui__play-pause__button').trigger('click')
      expect(wrapper.emitted('input')[1]).toEqual([true])
    })

    test('should emit "step" when hitting the button', () => {
      wrapper.find('.ui__step__button').trigger('click')
      expect(animation.mainLoop).toBeCalledTimes(1)
    })
  })
})