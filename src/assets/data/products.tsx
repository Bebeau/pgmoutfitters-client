import specialOps from '../img/special-ops.png';
import treeHugger from '../img/treehugger_plain.png';
import fiveInOne from '../img/5n1.png';

export type productType = {
  state: string;
  name: string;
  image: string;
  link: string;
  blueprint: string;
  description: string;
  price: {
    retail: number;
    dealer: number;
  }
}

export const productData = [
  {
    state: 'specialOps',
    name: 'Special-Ops',
    image: specialOps,
    link: 'special-ops',
    blueprint: '',
    description: '',
    price: {
      retail: 1875,
      dealer: 1500
    }
  },
  {
    state: 'treeHugger',
    name: 'TreeHugger',
    image: treeHugger,
    link: 'treehugger',
    blueprint: '',
    description: '',
    price: {
      retail: 795,
      dealer: 635
    }
  },
  {
    state: 'fiveInOne',
    name: '5-N-1',
    image: fiveInOne,
    link: '5-n-1',
    blueprint: '',
    description: '',
    price: {
      retail: 2250,
      dealer: 1800
    }
  }
];