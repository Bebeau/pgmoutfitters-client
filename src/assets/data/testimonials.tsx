import eric from '../img/testimonials/eric.jpg';
import alex from '../img/testimonials/alex.jpg';
import steve from '../img/testimonials/steve.jpg';

export type testimonialType = {
  quote: string;
  name: string;
  image: string;
}

export const testimonialData = [
  {
    quote: 'I have never seen anything like the Special-Ops. It allows the ability to split feed between timer and gravity. It can hold 800lbs of corn on the full timer feed setting, 350lbs protein and 450lbs of corn on the split feed setting. Then, in the off season, I will use the full gravity setting and fill it with about 600lbs of protein.',
    name: 'Eric',
    image: eric
  },
  {
    quote: 'The 5-n-1 feeder is a buffet style feeder with the ability to offer 5 different food sources. There are 4 gravity chambers on each side, and 1 large cascade chamber in the center. This thing was built for West Texas ranches and game management.',
    name: 'Alex',
    image: alex
  },
  {
    quote: 'The TreeHugger is the rice brand feeder I have been looking for. It is portable, has a timer operated shaker, and sticks to the side of any tree. It ensures the boars do not eat all my rice brand before I am able to get out there and hunt.',
    name: 'Steve',
    image: steve
  }
];