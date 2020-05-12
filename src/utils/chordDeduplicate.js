export default function chordDeduplicate(chords) {
    return chords.filter((chord, index) => chord && chord !== chords[index + 1])
}
