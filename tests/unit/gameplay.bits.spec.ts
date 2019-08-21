import { clearBit, setBit, testBit, toggleBit } from '../../lib/gameplay'

describe('setBit', () => {
  it('sets a bit to 1 on a hunk', () => {
    const data = new Uint32Array(8)
    setBit(data, 0) // 0x1
    expect(testBit(data, 0)).toBeTruthy()

    setBit(data, 1) // 0x11
    expect(testBit(data, 1)).toBeTruthy()

    setBit(data, 16) // 0x0000000000000011 0x0000000000000001
    expect(testBit(data, 16)).toBeTruthy()
    expect(testBit(data, 16)).toBeTruthy()

    setBit(data, 255)
    expect(testBit(data, 255)).toBeTruthy()
  })
})

describe('clearBit', () => {
  it('sets a bit to 0 on a hunk', () => {
    const data = new Uint32Array(8)
    setBit(data, 0)
    setBit(data, 1)
    setBit(data, 16)

    clearBit(data, 0)
    clearBit(data, 16)

    expect(testBit(data, 0)).toBeFalsy()
    expect(testBit(data, 1)).toBeTruthy()
    expect(testBit(data, 16)).toBeFalsy()
  })
})

describe('toggleBit', () => {
  it('toggles bits to 1/0 on a hunk', () => {
    const data = new Uint32Array(8)
    toggleBit(data, 0) // 0x1
    expect(testBit(data, 0)).toBeTruthy()

    toggleBit(data, 0) // 0x11
    expect(testBit(data, 1)).toBeFalsy()

    toggleBit(data, 16) // 0x0000000000000011 0x0000000000000001
    expect(testBit(data, 16)).toBeTruthy()
  })
})

describe('testBit', () => {
  it('returns true or false based on the status of the bit', () => {
    const data = new Uint32Array(8)
    setBit(data, 0) // 0x1
    expect(testBit(data, 0)).toBeTruthy()

    setBit(data, 1) // 0x11
    expect(testBit(data, 1)).toBeTruthy()

    setBit(data, 16) // 0x0000000000000011 0x0000000000000001
    expect(testBit(data, 16)).toBeTruthy()
  })
})
