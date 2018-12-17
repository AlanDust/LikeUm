import RecordContainer from '../../../app/javascript/react/containers/RecordContainer'
import InterimSpeechTile from '../../../app/javascript/react/components/InterimSpeechTile'
import FinalSpeechTile from '../../../app/javascript/react/components/FinalSpeechTile'
import BuzzwordForm from '../../../app/javascript/react/components/BuzzwordForm'

describe('RecordContainer', () => {
  let wrapper;
  let data = [{
    id: 1,
    newBuzzword: "Like",
    interimSpeech: "This is like an interim speech",
    finalSpeech: "This is a final speech",
  }]
  beforeEach(() => {
    wrapper = mount(
      <BuzzwordForm
      />
      // <InterimSpeechTile
      // />
      // <FinalSpeechTile
      // />
    )
  })
  it('should render a buzzword on the index page', () => {
    setTimeout(() => {
      expect(wrapper.find(BeerTile)).toBePresent();
      done()
    }, 0)
  });
});
