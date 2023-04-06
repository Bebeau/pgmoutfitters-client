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
    quote: 'These deer feeders are better than anything else on the market. They are high-end durable feeders well worth the money. What sold me is the volume of feed they are able to hold. It’s great, we only have to fill them once a season.',
    name: 'Eric',
    image: eric
  },
  {
    quote: 'These deer feeders are better than anything else on the market. They are high-end durable feeders well worth the money. What sold me is the volume of feed they are able to hold. It’s great, we only have to fill them once a season.',
    name: 'Alex',
    image: alex
  },
  {
    quote: 'These deer feeders are better than anything else on the market. They are high-end durable feeders well worth the money. What sold me is the volume of feed they are able to hold. It’s great, we only have to fill them once a season.',
    name: 'Steve',
    image: steve
  }
];