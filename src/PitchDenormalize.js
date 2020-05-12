import { Key } from '@tonaljs/tonal'

import PitchClass from './PitchClass'

function parseKeySignature(keySignature, mode) {
    switch (mode) {
        case 0:
            return Key.minorKey(keySignature)
        case 1:
            return Key.majorKey(keySignature)
        default:
            return Key.majorKey(keySignature)
    }
}

export default class PitchDenormalize {
    constructor(keySignature, modality) {
        this.modality = modality // Must need use for some where?
        this.keySignature = keySignature
        this.key = parseKeySignature(
            PitchClass.parseNumberToNote(this.keySignature),
            this.modality
        )
    }
    denormalize = (pitchClasses) => {
        // Possible return value: 0 ~ 11
        // https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/#pitch

        const scale = PitchClass.getChromaticScaleFromKeySignature(
            this.keySignature
        )
        const notes = pitchClasses
            .map((pitch, index) => {
                const note = scale[index]
                return {
                    note,
                    val: pitch,
                    index,
                }
            })
            .sort((note, nextNote) => nextNote.val - note.val)
            .filter((note) => note.val < 0.3)
        const key = this.key
        const choredScale = key.chords
        const noisyNote = notes.find((note) => key.scale.includes(note.note))
        if (!noisyNote) return undefined
        return choredScale[key.scale.indexOf(noisyNote.note)]
    }
}
