import {
  sandboxed
} from '../src'

describe('sanboxed', () => {
  describe('runs sandboxed code from string', () => {

    it('code: 123 returns number 123', () => {
      const result = sandboxed({ code: `123` })
      expect(typeof result).toBe('number')
      expect(result).toEqual(123)
    })
  })
})
