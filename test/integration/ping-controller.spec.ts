import LeakDetector from 'jest-leak-detector'

function loadTest(): (name: string, test: (testEnv: any) => void) => void {
  return (name, test) => {
    describe(name, () => {
      let testEnv = { test: () => false }

      test(testEnv)

      afterAll(async () => {
        const detector = new LeakDetector(testEnv)
        testEnv = null as any
        expect(await detector.isLeaking()).toBe(false)
      })
    })
  }
}

loadTest()('Test: leak', (testEnv) => {
  it('bla', () => {
    testEnv.test()
  })
})




// describe('Test: no leak', () => {
//   describe('bla', () => {
//     let testEnv = { test: () => false }

//     it('bla', () => {
//       testEnv.test()
//     })

//     afterAll(async () => {
//       const detector = new LeakDetector(testEnv)
//       testEnv = null as any
//       expect(await detector.isLeaking()).toBe(false)
//     })
//   })
// })
