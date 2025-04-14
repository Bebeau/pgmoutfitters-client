import feature from '../../img/feeders/4n1/4n1.png';
import bluePrint from '../../img/feeders/4n1/blueprint.svg';
import photo1 from '../../img/feeders/4n1/photos/1.jpg';
import photo2 from '../../img/feeders/4n1/photos/2.jpg';
import photo3 from '../../img/feeders/4n1/photos/3.jpg';
import photo4 from '../../img/feeders/4n1/photos/4.jpg';
import photo5 from '../../img/feeders/4n1/photos/5.jpg';
import photo6 from '../../img/feeders/4n1/photos/6.jpg';
import photo7 from '../../img/feeders/4n1/photos/7.jpg';
import photo8 from '../../img/feeders/4n1/photos/8.jpg';

export const FourInOne = {
  name: '4-N-1',
  image: feature,
  slug: '4-n-1',
  blueprint: bluePrint,
  description: '',
  specs: [
    '1100 or 1700 lb Capacity',
    '4 Gravity Feed Chambers',
    'Towable Draggable Base',
    'Feed Level Sightglass',
    'Stand and Fill Style',
    'Feed Tray Clean out Door',
    'Feed Tray Open/Close Door',
  ],
  photos: [
    {
      thumb: photo1,
      full: photo1,
      title: '12 Volt Solar Panel',
      desc: 'A small solar panel is mounted to the top side, harnessing energy from the sun to charge a 12 volt battery, which powers a deer feeder.',
    },
    {
      thumb: photo2,
      full: photo2,
      title: 'Changable Feed Options',
      desc: 'There are two levelers used to swivel metal plates within the body of the feeder. This changes the flow within the feed chambers.',
    },
    {
      thumb: photo3,
      full: photo3,
      title: 'Latchable Rain Guard',
      desc: 'The top overlaps to prevent rain from getting into the feed. There is a latch to hold the top in place and optionally lock it.',
    },{
      thumb: photo4,
      full: photo4,
      title: 'Tow Bar',
      desc: 'The feeder is built on two metal sled bases with a tow bar to latch onto to easily drag and position the feeder with a vehicle.',
    },
    {
      thumb: photo5,
      full: photo5,
      title: '30lb Hydrolic Lift',
      desc: 'A hydrolic lift is added to the inside of the feeder top to allow for ease with opening and closing.',
    },
    {
      thumb: photo6,
      full: photo6,
      title: 'Funnel Drop Door',
      desc: 'The motor is latched and swivels out from the bottom of the feeder to expose the feed funnel for easy access.',
    },
    {
      thumb: photo7,
      full: photo7,
      title: 'Feed Funnel',
      desc: 'The feed funnel is cut short to deter varments while not affecting the flow.',
    },
    {
      thumb: photo8,
      full: photo8,
      title: 'Timer Motor Casing',
      desc: 'The battery and motor are stored in an 1/8 in steel casing to protect from boar and the elements.',
    }
  ],
  price: {
    retail: 1500,
  }
}