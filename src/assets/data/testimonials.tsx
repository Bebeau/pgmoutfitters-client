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
    quote: 'I have run about every feeder on the market over the last twenty years, and this is the first one that really solved the corn-versus-protein issue. Being able to switch between timer feed and gravity feed without hauling in extra equipment has been a game changer for our lease.',
    name: 'Wade H., South Texas',
    image: steve
  },
  {
    quote: 'The build quality impressed me right away. We had storms, hogs, and raccoons beating on these feeders all season and they kept running without a hiccup. Deer adapted to them fast, and we are seeing more consistent movement than we did with our old spin feeders.',
    name: 'Travis M., Central Oklahoma',
    image: alex
  },
  {
    quote: 'What sold me was the flexibility. Early season we run protein, then transition to corn during hunting season without changing feeders. That saves us time, fuel, and a lot of headaches. Honestly one of the smartest feeder designs I have used.',
    name: 'Clay R., West Louisiana',
    image: eric
  }
];