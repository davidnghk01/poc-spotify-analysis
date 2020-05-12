import Segment from './Segment'
import chordDeduplicate from './utils/chordDeduplicate'
import PitchClass from './PitchClass'

export function parseSpotifyResponseToNoations(spotifyResponse) {
    const { bars, beats, segments, track, sections } = spotifyResponse
    const { time_signature, tempo, key } = track
    const chords = segments.map((segment, index) => {
        const _segment = new Segment(track, segment, index)
        _segment.trackBars = bars
        _segment.trackBeats = beats
        _segment.trackSections = sections
        return _segment.computeChord()
    })
    const chordNotations = Array.from(Array(bars.length).keys()).map(() => [])
    for (const chord of chords) {
        for (const bar of chord.bars) {
            chordNotations[bar.index].push(chord.chord)
        }
    }
    return {
        key: PitchClass.parseNumberToNote(key),
        tempo,
        time_signature,
        bars: chordNotations.map(chordDeduplicate),
    }
}

async function exportToMusicNotes(elementId, notations) {
    const { default: Vex } = await import('vexflow')
    const vf = new Vex.Flow.Factory({
        renderer: { elementId: elementId, width: 1080, height: 1920 },
    })

    const score = vf.EasyScore()
    const system = vf.System()

    system
        .addStave({
            voices: [
                score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),
                score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
            ],
        })
        .addClef('treble')
        .addTimeSignature('4/4')

    vf.draw()
}

// exportToMusicNotes("foobar", [])
