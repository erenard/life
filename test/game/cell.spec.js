import { describe, it } from 'mocha'
import { assert, expect } from 'chai'

import { default as Cell, Rules } from 'game/cell'

describe('Cell', () => {
  describe('new ()', () => {
    it('should initialize a Cell', () => {
      var cell = new Cell()
      expect(cell).to.deep.equal({
        state: 0,
        age: 0,
        sprite: null,
        count: 0
      })
    })
  })
  describe('update ()', () => {
    it('should keep a cell state', () => {
      var cell = new Cell()
      cell.update(0)
      expect(cell).to.deep.equal({
        state: 0,
        age: 0,
        sprite: null,
        count: 0
      })
    })
    it('should reborn a cell', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.update(1)
      expect(cell).to.deep.equal({
        state: 1,
        age: 0,
        sprite: {alpha: 0.5},
        count: 0
      })
    })
    it('should increment a living cell age', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.state = 1
      cell.update(1)
      expect(cell.age).to.be.equal(1)
    })
    it('should keep a dead cell age', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.update(0)
      expect(cell.age).to.be.equal(0)
    })
    it('should update the opacity at age == 5', () => {
      var cell = new Cell()
      cell.state = 1
      cell.sprite = {}
      cell.age = 4
      cell.update(1)
      expect(cell.sprite.alpha).to.be.equal(1)
    })
    it('should kill a cell', () => {
      var cell = new Cell()
      cell.state = 1
      cell.sprite = {}
      var dead = new Cell()
      dead.sprite = {alpha: 0}
      cell.update(0)
      expect(cell).to.deep.equal(dead)
    })
  })
  describe('get Rules ()', () => {
    it('should return the rules', () => {
      assert.deepEqual(Rules, {
        b: [false, false, false, false, false, false, false, false, false],
        s: [false, false, false, false, false, false, false, false, false]
      })
    })
  })
})
