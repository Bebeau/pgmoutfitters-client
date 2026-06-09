import feature from '../../img/feeders/dockfeeder/dockfeeder.png';
// import bluePrint from '../../img/feeders/1n1/blueprint.svg';
import photo1 from '../../img/feeders/dockfeeder/photos/1.jpg';
// import photo2 from '../../img/feeders/woody/photos/2.jpg';
import photo3 from '../../img/feeders/woody/photos/3.jpg';
// import photo4 from '../../img/feeders/woody/photos/4.jpg';
// import photo5 from '../../img/feeders/woody/photos/5.jpg';
// import photo6 from '../../img/feeders/woody/photos/6.jpg';
// import photo7 from '../../img/feeders/woody/photos/7.jpg';
// import photo8 from '../../img/feeders/woody/photos/8.jpg';

export const DockFeeder = {
  name: 'Dock Feeder',
  image: feature,
  slug: 'dock-feeder',
  blueprint: '',
  description: '',
  specs: [
    '125 lb Directional Spin Mode',
    'Drop Door Feed Funnel Access',
    '12 volt Solar Panel',
    '12 volt Motor',
    '12 volt Battery',
    '6 Feed Settings (THE TIMER)',
    'Gas Actuator Assist Lid',
    'Feed Level Sightglass',
    'Stand and Fill Style',
    'Custom Patterns Available',
  ],
  photos: [
    {
      thumb: photo1,
      full: photo1,
      title: 'Dock Feeder',
      desc: 'Directional fish feeder throws up to 30 yards.',
    },
    {
      thumb: photo3,
      full: photo3,
      title: 'Latchable Rain Guard',
      desc: 'The top overlaps to prevent rain from getting into the feed. There is a latch to hold the top in place and optionally lock it.',
    },
  ],
  price: {
    retail: 995
  }
}