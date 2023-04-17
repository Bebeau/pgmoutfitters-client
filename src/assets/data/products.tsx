import specialOps from '../img/special-ops/special-ops.png';
import specialOpsBluePrint from '../img/special-ops/special-ops-blueprint.svg';
import specialOpsThumb1 from '../img/special-ops/photos/thumb/1.jpg';
import specialOpsThumb2 from '../img/special-ops/photos/thumb/2.jpg';
import specialOpsThumb3 from '../img/special-ops/photos/thumb/3.jpg';
import specialOpsThumb4 from '../img/special-ops/photos/thumb/4.jpg';
import specialOpsThumb5 from '../img/special-ops/photos/thumb/5.jpg';
import specialOpsThumb6 from '../img/special-ops/photos/thumb/6.jpg';
import specialOpsThumb7 from '../img/special-ops/photos/thumb/7.jpg';
import specialOpsThumb8 from '../img/special-ops/photos/thumb/8.jpg';
import specialOpsFull1 from '../img/special-ops/photos/full/1.jpg';
import specialOpsFull2 from '../img/special-ops/photos/full/2.jpg';
import specialOpsFull3 from '../img/special-ops/photos/full/3.jpg';
import specialOpsFull4 from '../img/special-ops/photos/full/4.jpg';
import specialOpsFull5 from '../img/special-ops/photos/full/5.jpg';
import specialOpsFull6 from '../img/special-ops/photos/full/6.jpg';
import specialOpsFull7 from '../img/special-ops/photos/full/7.jpg';
import specialOpsFull8 from '../img/special-ops/photos/full/8.jpg';

import treeHugger from '../img/tree-hugger/treehugger_plain.png';
import treeHuggerBluePrint from '../img/tree-hugger/treehugger-blueprint.svg';
import treeHuggerThumb1 from '../img/tree-hugger/photos/thumb/1.jpg';
import treeHuggerThumb2 from '../img/tree-hugger/photos/thumb/2.jpg';
import treeHuggerThumb3 from '../img/tree-hugger/photos/thumb/3.jpg';
import treeHuggerThumb4 from '../img/tree-hugger/photos/thumb/4.jpg';
import treeHuggerThumb5 from '../img/tree-hugger/photos/thumb/5.jpg';
import treeHuggerThumb6 from '../img/tree-hugger/photos/thumb/6.jpg';
import treeHuggerThumb7 from '../img/tree-hugger/photos/thumb/7.jpg';
import treeHuggerThumb8 from '../img/tree-hugger/photos/thumb/8.jpg';
import treeHuggerFull1 from '../img/tree-hugger/photos/full/1.jpg';
import treeHuggerFull2 from '../img/tree-hugger/photos/full/2.jpg';
import treeHuggerFull3 from '../img/tree-hugger/photos/full/3.jpg';
import treeHuggerFull4 from '../img/tree-hugger/photos/full/4.jpg';
import treeHuggerFull5 from '../img/tree-hugger/photos/full/5.jpg';
import treeHuggerFull6 from '../img/tree-hugger/photos/full/6.jpg';
import treeHuggerFull7 from '../img/tree-hugger/photos/full/7.jpg';
import treeHuggerFull8 from '../img/tree-hugger/photos/full/8.jpg';

import fiveInOne from '../img/5-n-1/5n1.png';
import fiveInOneBluePrint from '../img/5-n-1/5n1-blueprint.svg';
import fiveInOneThumb1 from '../img/5-n-1/photos/thumb/1.jpg';
import fiveInOneThumb2 from '../img/5-n-1/photos/thumb/2.jpg';
import fiveInOneThumb3 from '../img/5-n-1/photos/thumb/3.jpg';
import fiveInOneThumb4 from '../img/5-n-1/photos/thumb/4.jpg';
import fiveInOneThumb5 from '../img/5-n-1/photos/thumb/5.jpg';
import fiveInOneThumb6 from '../img/5-n-1/photos/thumb/6.jpg';
import fiveInOneThumb7 from '../img/5-n-1/photos/thumb/7.jpg';
import fiveInOneThumb8 from '../img/5-n-1/photos/thumb/8.jpg';
import fiveInOneFull1 from '../img/5-n-1/photos/full/1.jpg';
import fiveInOneFull2 from '../img/5-n-1/photos/full/2.jpg';
import fiveInOneFull3 from '../img/5-n-1/photos/full/3.jpg';
import fiveInOneFull4 from '../img/5-n-1/photos/full/4.jpg';
import fiveInOneFull5 from '../img/5-n-1/photos/full/5.jpg';
import fiveInOneFull6 from '../img/5-n-1/photos/full/6.jpg';
import fiveInOneFull7 from '../img/5-n-1/photos/full/7.jpg';
import fiveInOneFull8 from '../img/5-n-1/photos/full/8.jpg';

export type productImage = {
  thumb: string;
  full: string;
  title: string;
  desc: string;
}

export type productType = {
  name: string;
  image: string;
  slug: string;
  blueprint: string;
  description: string;
  specs: string[],
  photos: productImage[]
  price: {
    retail: number;
    dealer: number;
  }
}

export const productData = [
  {
    name: 'Special-Ops',
    image: specialOps,
    slug: 'special-ops',
    blueprint: specialOpsBluePrint,
    description: 'This next generation deer feeder offers feeding options with the turn of a lever to configure between gravity and timer feeding.',
    specs: [
      'Split gravity/timer feeder',
      '3 adjustable feed load settings',
      '6 feed settings (THE TIMER)',
      '800 lb full timer',
      '350 lb gravity / 450 lb timer',
      '600 lb full gravity',
      'Drop door feed funnel access',
      '12 volt solar panel',
      '12 volt motor',
      '12 volt battery',
      'Towable draggable base',
      '30 lb weighted hinge door',
      'Rain guard latchable lid',
    ],
    photos: [
      {
        thumb: specialOpsThumb1,
        full: specialOpsFull1,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: specialOpsThumb2,
        full: specialOpsFull2,
        title: 'Changable Feed Options',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: specialOpsThumb3,
        full: specialOpsFull3,
        title: 'Latchable Rain Guard Lid',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },{
        thumb: specialOpsThumb4,
        full: specialOpsFull4,
        title: 'Tow Bar',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: specialOpsThumb5,
        full: specialOpsFull5,
        title: '30lb Hydrolic Lift',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: specialOpsThumb6,
        full: specialOpsFull6,
        title: 'Easy Access Latchable Modar',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: specialOpsThumb7,
        full: specialOpsFull7,
        title: 'Feed Funnel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: specialOpsThumb8,
        full: specialOpsFull8,
        title: 'Timer Motar Casing',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    ],
    price: {
      retail: 1875,
      dealer: 1500
    }
  },
  {
    name: 'TreeHugger',
    image: treeHugger,
    slug: 'treehugger',
    blueprint: treeHuggerBluePrint,
    description: 'This next generation deer feeder was created specifically for all the rice brand believers. Just lean and feed.',
    specs: [
      'Gravity feeder',
      'Proprietary shaker',
      '100 lb total feed volume',
      'Side door feed access',
      '6 volt motor',
      '12 volt solar panel',
      '12 volt battery',
      '6 feed settings (THE TIMER)',
      'Metal teeth tree anchors',
      'Poly sealed view window',
      'Rain guard latchable lid',
    ],
    photos: [
      {
        thumb: treeHuggerThumb1,
        full: treeHuggerFull1,
        title: 'Photo Title',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: treeHuggerThumb2,
        full: treeHuggerFull2,
        title: 'Photo Title',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: treeHuggerThumb3,
        full: treeHuggerFull3,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },{
        thumb: treeHuggerThumb4,
        full: treeHuggerFull4,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: treeHuggerThumb5,
        full: treeHuggerFull5,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: treeHuggerThumb6,
        full: treeHuggerFull6,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: treeHuggerThumb7,
        full: treeHuggerFull7,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: treeHuggerThumb8,
        full: treeHuggerFull8,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    ],
    price: {
      retail: 795,
      dealer: 635
    }
  },
  {
    name: '5-N-1',
    image: fiveInOne,
    slug: '5-n-1',
    blueprint: fiveInOneBluePrint,
    description: 'This next generation deer feeder offers 5 chambers, 4 gravity feed stations, and 1 central timer feed station. Made for serious game management.',
    specs: [
      '1100 lb total feed volume',
      '5 feed chambers',
      '650 lb gravity',
      '450 lb timer',
      'Drop door feed funnel access',
      '12 volt solar panel',
      '12 volt motor',
      '12 volt battery',
      '6 feed settings (THE TIMER)',
      'Towable draggable base',
      'Swivel lever door',
      'Rain guard swivel top',
      'Poly sealed view windows',
    ],
    photos: [
      {
        thumb: fiveInOneThumb1,
        full: fiveInOneFull1,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: fiveInOneThumb2,
        full: fiveInOneFull2,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: fiveInOneThumb3,
        full: fiveInOneFull3,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },{
        thumb: fiveInOneThumb4,
        full: fiveInOneFull4,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: fiveInOneThumb5,
        full: fiveInOneFull5,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: fiveInOneThumb6,
        full: fiveInOneFull6,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: fiveInOneThumb7,
        full: fiveInOneFull7,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        thumb: fiveInOneThumb8,
        full: fiveInOneFull8,
        title: '12 Volt Solar Panel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    ],
    price: {
      retail: 2250,
      dealer: 1800
    }
  }
];