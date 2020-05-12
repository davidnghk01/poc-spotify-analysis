import PitchDenormalize from '../../PitchDenormalize'

it('Should denormalize as first item of C key', () => {
    const denormalizedResult = new PitchDenormalize(0).denormalize([
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
    ]) // C Key
    expect(denormalizedResult).toEqual('Eb9no5/C#')
})
