import isTimeOverlapped from '../isTimeOverlapped'

describe('Test isTimeOverlapped', () => {
    it('T1 contain T2', () => {
        const t1 = { start: 0, end: 1 }
        const t2 = { start: 0.4, end: 0.6 }
        expect(isTimeOverlapped(t1, t2)).toBeTruthy()
    })
    it('T2 contain T1', () => {
        const t1 = { start: 0.4, end: 0.6 }
        const t2 = { start: 0, end: 1 }
        expect(isTimeOverlapped(t1, t2)).toBeTruthy()
    })
    it('T1 start overlapping with T2 end', () => {
        const t1 = { start: 0.7, end: 1.7 }
        const t2 = { start: 0, end: 0.8 }
        expect(isTimeOverlapped(t1, t2)).toBeTruthy()
    })
    it('T1 end overlapping with T2 start', () => {
        const t1 = { start: 0, end: 1 }
        const t2 = { start: 0.4, end: 0.6 }
        expect(isTimeOverlapped(t1, t2)).toBeTruthy()
    })
})
