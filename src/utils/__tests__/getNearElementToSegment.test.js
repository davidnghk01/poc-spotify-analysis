import getNearElementToSegment from '../getNearElementToSegment'

it('getNearElementToSegment', () => {
    const elements = [
        { start: 0, end: 3 },
        { start: 1, end: 2 },
        { start: 3, end: 8 },
    ]
    const nearElement = getNearElementToSegment(
        elements,
        {
            start: 4,
            end: 6,
        },
        () => true
    )
    expect(nearElement).toEqual({ start: 0, end: 3 })
})

it('getNearElementToSegment with filter', () => {
    const elements = [
        { start: 0, end: 3 },
        { start: 1, end: 2 },
        { start: 3, end: 8 },
    ]
    const nearElement = getNearElementToSegment(
        elements,
        {
            start: 4,
            end: 6,
        },
        (item) => item.end > 10
    )
    expect(nearElement).toEqual(undefined)
})
