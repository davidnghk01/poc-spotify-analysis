import getRelatedElementsToSegment from '../getRelatedElementsToSegment'

it('Should skip element that unrelated to current segment timeline', () => {
    const elements = [
        { start: 0, end: 1 },
        { start: 1, end: 2 },
        { start: 3, end: 4 },
    ]
    const relatedElements = getRelatedElementsToSegment('bars', elements, {
        start: 0,
        end: 2,
    })
    expect(relatedElements).toHaveLength(2)
})
