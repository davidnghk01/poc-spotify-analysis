import { or } from 'ramda'
import isTimeOverlapped from './isTimeOverlapped'

export default function getRelatedElementsToSegment(
    elementType,
    elements,
    segment
) {
    const { start: segmentStart, end: segmentEnd } = segment
    const relatedElements = elements
        .map((element, index) => {
            const {
                start: elementStart = 0,
                duration: elementDuration,
            } = element
            const elementEnd = elementStart + elementDuration
            if (
                isTimeOverlapped(
                    { start: segmentStart, end: segmentEnd },
                    { start: elementStart, end: elementEnd }
                )
            ) {
                return {
                    index,
                    [elementType]: element,
                }
            } else {
                return undefined
            }
        })
        .filter((element) => !!element)
    return relatedElements
}
