import feature from '../../img/feeders/coveycafe/coveycafe.png';
import bluePrint from '../../img/feeders/coveycafe/blueprint.svg';
import photo1 from '../../img/feeders/coveycafe/photos/1.jpg';
import photo2 from '../../img/feeders/coveycafe/photos/2.jpg';
import photo3 from '../../img/feeders/coveycafe/photos/3.jpg';
import photo4 from '../../img/feeders/coveycafe/photos/4.jpg';

export const CoveyCafe = {
  name: 'Covey Cafe',
  image: feature,
  slug: 'covey-cafe',
  blueprint: bluePrint,
  description: '',
  specs: [
    '200 lb Gravity Feed', 
    'Adjustable Feed Flow',
    'Gas Actuater Lid Assist',
    '8 Quail Entry and Exit Points',
    'Stand and Fill Style',
    'Custom Patterns Available',
  ],
  photos: [
    {
      thumb: photo1,
      full: photo1,
      title: 'Gas Actuator Assisted Lid',
      desc: 'Hydraulic arm attached to the lid for ease with opening and closing.',
    },
    {
      thumb: photo2,
      full: photo2,
      title: 'Drop Door Feed Funnel Access',
      desc: 'The feed funnel is placed on hinges to swing open for easy funnel access.',
    },
    {
      thumb: photo3,
      full: photo3,
      title: 'Adjustable Feed Flow',
      desc: 'The feed plate is adjustable to dictate the flow of food and provide quail with easy access.',
    },{
      thumb: photo4,
      full: photo4,
      title: 'Side Door Access',
      desc: 'Side door swings up for easy access to the feeder.',
    },
  ],
  price: {
    retail: 1250,
  }
}