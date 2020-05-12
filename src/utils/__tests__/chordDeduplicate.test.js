import chordDeduplicate from '../chordDeduplicate'

it('Test chordDeduplicate', () => {
    const data = ['F#m7', 'C#m7', 'Amaj7', 'F#m7', 'C#m7', 'Amaj7', 'Amaj7']
    expect(chordDeduplicate(data)).toEqual([
        'F#m7',
        'C#m7',
        'Amaj7',
        'F#m7',
        'C#m7',
        'Amaj7',
    ])
})
