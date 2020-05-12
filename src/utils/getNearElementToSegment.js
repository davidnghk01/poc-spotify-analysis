export default function getNearElementsToSegment(elements, segment, filterFn) {
    const { start: segmentStart } = segment
    const nearElement = elements
        .sort((elementA, elementB) => {
            const {
                start: elementAStart = 0,
                duration: elementADuration,
            } = elementA
            const elementAEnd = elementAStart + elementADuration
            const {
                start: elementBStart = 0,
                duration: elementBDuration,
            } = elementB
            const elementBEnd = elementBStart + elementBDuration
            const elementADistanceToSegment = Math.abs(
                segmentStart - elementAEnd
            )
            const elementBDistanceToSegment = Math.abs(
                segmentStart - elementBEnd
            )
            return elementBDistanceToSegment - elementADistanceToSegment
        })
        .filter(filterFn)[0]
    return nearElement
}
