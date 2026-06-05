import feature from '../../img/feeders/backyard/backyard.png';
// import bluePrint from '../../img/feeders/1n1/blueprint.svg';
import photo1 from '../../img/feeders/woody/photos/3.jpg';
import photo2 from '../../img/feeders/woody/photos/5.jpg';
import photo3 from '../../img/feeders/ricebrand/photos/5.jpg';

export const BackYard = {
  name: 'Backyard',
  image: feature,
  slug: 'backyard',
  blueprint: '',
  description: '',
  specs: [
    '250 lb Spin Mode',
    'Drop Door Feed Funnel Access',
    '12 volt Solar Panel',
    '12 volt Motor',
    '12 volt Battery',
    '6 Feed Settings (THE TIMER)',
    'Gas Actuator Assist Lid',
    'Feed Level Sightglass',
    'Raccoon Deterent Shield System',
    'Stand and Fill Style',
    'Custom Patterns Available',
  ],
  photos: [
    {
      thumb: photo1,
      full: photo1,
      title: 'Latchable Rain Guard',
      desc: 'The top overlaps to prevent rain from getting into the feed. There is a latch to hold the top in place and optionally lock it.',
    },
    {
      thumb: photo2,
      full: photo2,
      title: '30lb Hydrolic Lift',
      desc: 'A hydrolic lift is added to the inside of the feeder top to allow for ease with opening and closing.',
    },
    {
      thumb: photo3,
      full: photo3,
      title: 'Side Door Open',
      desc: 'The side door opens to expose room below the shaker within the feeder.',
    },
  ],
  price: {
    retail: 750
  }
}