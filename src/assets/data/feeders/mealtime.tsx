import feature from '../../img/feeders/mealtime/mealtime.png';
import bluePrint from '../../img/feeders/mealtime/blueprint.svg';
import photo1 from '../../img/feeders/mealtime/photos/1.jpg';
import photo2 from '../../img/feeders/mealtime/photos/2.jpg';
import photo3 from '../../img/feeders/mealtime/photos/3.jpg';
import photo4 from '../../img/feeders/mealtime/photos/4.jpg';
import photo5 from '../../img/feeders/mealtime/photos/5.jpg';
import photo6 from '../../img/feeders/mealtime/photos/6.jpg';
import photo7 from '../../img/feeders/mealtime/photos/7.jpg';
// import photo8 from '../../img/feeders/mealtime/photos/8.jpg';

export const MealTime = {
  name: 'Mass XL',
  image: feature,
  slug: 'mass-xl',
  blueprint: bluePrint,
  description: '',
  specs: [
    '125 lb Feed Capcity',
    'Timer Controlled for ALL Mill Processed Feeds',
    'Adjustable Flow Control Vibrating Plate',
    'Feeds All Textured Mill Types',
    'Feed Level Sightglass',
    'Other Uses - Farm & Ranch Applications',
    '6 volt Motor',
    '12 volt Solar Panel',
    '12 volt Battery',
    '6 Feed Settings (THE TIMER)',
    'Metal Teeth Tree anchors',
    'Poly Sealed View window',
    'Rain Guard Latchable Lid',
  ],
  photos: [
    {
      thumb: photo1,
      full: photo1,
      title: 'Meal Time',
      desc: 'The only lean to rice brand feeder of its kind.',
    },
    {
      thumb: photo2,
      full: photo2,
      title: 'Metal Teeth Anchors',
      desc: 'A large metal teeth anchor is attached to the back of the feeder to secure it to any tree.',
    },
    {
      thumb: photo3,
      full: photo3,
      title: 'Latchable Rain Guard',
      desc: 'The top overlaps to prevent rain from getting into the feed. There is a latch to hold the top in place and optionally lock it.',
    },{
      thumb: photo4,
      full: photo4,
      title: 'Side Door Closed',
      desc: 'A side door was added to the feeder to easily access the battery and mechanical hardware.',
    },
    {
      thumb: photo5,
      full: photo5,
      title: 'Side Door Open',
      desc: 'The side door opens to expose room below the shaker within the feeder.',
    },
    {
      thumb: photo6,
      full: photo6,
      title: '12 Volt Solar Panel',
      desc: 'The motor is latched and swivels out from the bottom of the feeder to expose the feed funnel for easy access.',
    },
    {
      thumb: photo7,
      full: photo7,
      title: 'Feed Troff',
      desc: 'An open feeding troff is exposed across the entire front of the feeder to disperse the rice brand.',
    }
  ],
  price: {
    retail: 795
  }
}