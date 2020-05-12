export default class PitchClass {
    static #pitchClassMapping = {
        0: 'C',
        1: 'C#',
        2: 'D',
        3: 'Eb',
        4: 'E',
        5: 'F',
        6: 'F#',
        7: 'G',
        8: 'G#',
        9: 'A',
        10: 'Bb',
        11: 'B',
    }

    static parseNumberToNote(keySignatureNumber) {
        return PitchClass.#pitchClassMapping[keySignatureNumber]
    }

    static getChromaticScaleFromKeySignature(keySignature) {
        const scale = []
        for (let i = 0; i < 12; i++) {
            const index = (keySignature + i) % 12 // https://en.wikipedia.org/wiki/Equal_temperament
            const note = PitchClass.#pitchClassMapping[index]
            scale.push(note)
        }
        return scale
    }
}
