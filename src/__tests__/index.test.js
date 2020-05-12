import { sample2 as sample } from '../__fixtures__'
import { parseSpotifyResponseToNoations } from '../'

it('Should work', () => {
    const response = parseSpotifyResponseToNoations(sample)
    console.log(response)
})
