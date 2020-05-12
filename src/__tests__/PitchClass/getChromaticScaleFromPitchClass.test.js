import PitchClass from '../../PitchClass'

describe('Test getChromaticScaleFromPitchClass', () => {
    it.each`
        keySignature | scaleStart | scaleEnd
        ${0}         | ${'C'}     | ${'B'}
        ${1}         | ${'C#'}    | ${'C'}
        ${2}         | ${'D'}     | ${'C#'}
        ${3}         | ${'Eb'}    | ${'D'}
        ${4}         | ${'E'}     | ${'Eb'}
        ${5}         | ${'F'}     | ${'E'}
        ${6}         | ${'F#'}    | ${'F'}
        ${7}         | ${'G'}     | ${'F#'}
        ${8}         | ${'G#'}    | ${'G'}
        ${9}         | ${'A'}     | ${'G#'}
        ${10}        | ${'Bb'}    | ${'A'}
        ${11}        | ${'B'}     | ${'Bb'}
    `(
        'Should generate chromatic scale from key signature: $scaleStart',
        ({ keySignature, scaleStart, scaleEnd }) => {
            const scale = PitchClass.getChromaticScaleFromKeySignature(
                keySignature
            )
            expect(scale).toHaveLength(12)
            expect(scale[0]).toEqual(scaleStart)
            expect(scale[11]).toEqual(scaleEnd)
        }
    )
})
