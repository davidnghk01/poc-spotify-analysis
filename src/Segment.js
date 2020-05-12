import getRelatedElementsToSegment from './utils/getRelatedElementsToSegment'
import getNearElementToSegment from './utils/getNearElementToSegment'

import PitchDenormalize from './PitchDenormalize'
import { or } from 'ramda'

export class Segment {
    #index
    #segment
    #track
    #trackBars = []
    #trackBeats = []
    #trackSections = []
    #relatedBars = []
    #relatedBeats = []
    #relatedSections = []

    constructor(track, segment, index) {
        const { start = 0, duration } = segment

        this.#track = track
        this.#segment = { ...segment, start, end: start + duration }
        this.#index = index
    }

    debugInfo() {
        return {
            relatedBars: this.#relatedBars.length,
            relatedBeats: this.#relatedBeats.length,
            relatedSections: this.#relatedSections.length,
        }
    }

    computeChord() {
        const { pitches } = this.#segment
        const { key, mode } = this.computeTimeSignatureFromSection()
        const pitchDenormalize = new PitchDenormalize(key, mode)
        const chord = pitchDenormalize.denormalize(pitches)
        return {
            chord,
            bars: this.#relatedBars,
        }
    }

    computeTimeSignatureFromSection() {
        const hasRelatedSection = this.#relatedSections.length > 0
        const isRelatedSectionHasKey =
            hasRelatedSection && this.#relatedSections[0].key
        const isTrackHasKey = this.#track.key
        const shouldUseRelatedSection =
            hasRelatedSection && isRelatedSectionHasKey && isTrackHasKey
        const { section: firstSection = {} } = shouldUseRelatedSection
            ? this.#relatedSections[0]
            : {
                  section: getNearElementToSegment(
                      this.#trackSections,
                      this.#segment,
                      (segment) => !!segment.key
                  ),
              }
        const keySignature = shouldUseRelatedSection
            ? firstSection.key
            : or(firstSection.key, this.#track.key)
        const modality = shouldUseRelatedSection
            ? firstSection.mode
            : or(firstSection.mode, this.#track.mode)
        return {
            key: keySignature,
            mode: modality,
        }
    }

    set trackBars(bars) {
        this.#trackBars = bars
        this.#relatedBars = getRelatedElementsToSegment(
            'bar',
            bars,
            this.#segment
        )
    }
    set trackBeats(beats) {
        this.#trackBeats = beats
        this.#relatedBeats = getRelatedElementsToSegment(
            'beat',
            beats,
            this.#segment
        )
    }
    set trackSections(sections) {
        this.#trackSections = sections
        this.#relatedSections = getRelatedElementsToSegment(
            'section',
            sections,
            this.#segment
        )
    }
}

export default function createSegmentFromSpotifySegment(segment, index) {
    const _segment = new Segment(segment, index)
    return _segment
}
