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

import treeHugger from '../img/tree-hugger/treehugger.png';
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
        desc: 'A small solar panel is mounted to the top side, harnessing energy from the sun to charge a 12 volt battery, which powers a deer feeder.',
      },
      {
        thumb: specialOpsThumb2,
        full: specialOpsFull2,
        title: 'Changable Feed Options',
        desc: 'There are two levelers used to swivel metal plates within the body of the feeder. This changes the flow within the feed chambers.',
      },
      {
        thumb: specialOpsThumb3,
        full: specialOpsFull3,
        title: 'Latchable Rain Guard',
        desc: 'The top overlaps to prevent rain from getting into the feed. There is a latch to hold the top in place and optionally lock it.',
      },{
        thumb: specialOpsThumb4,
        full: specialOpsFull4,
        title: 'Tow Bar',
        desc: 'The feeder is built on two metal sled bases with a tow bar to latch onto to easily drag and position the feeder with a vehicle.',
      },
      {
        thumb: specialOpsThumb5,
        full: specialOpsFull5,
        title: '30lb Hydrolic Lift',
        desc: 'A hydrolic lift is added to the inside of the feeder top to allow for ease with opening and closing.',
      },
      {
        thumb: specialOpsThumb6,
        full: specialOpsFull6,
        title: 'Funnel Drop Door',
        desc: 'The motor is latched and swivels out from the bottom of the feeder to expose the feed funnel for easy access.',
      },
      {
        thumb: specialOpsThumb7,
        full: specialOpsFull7,
        title: 'Feed Funnel',
        desc: 'The feed funnel is cut short to deter varments while not affecting the flow.',
      },
      {
        thumb: specialOpsThumb8,
        full: specialOpsFull8,
        title: 'Timer Motor Casing',
        desc: 'The battery and motor are stored in an 1/8 in steel casing to protect from boar and the elements.',
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
        title: 'TreeHugger',
        desc: 'The only lean to rice brand feeder of its kind.',
      },
      {
        thumb: treeHuggerThumb2,
        full: treeHuggerFull2,
        title: 'Metal Teeth Tree Anchors',
        desc: 'A large metal teeth anchor is attached to the back of the feeder to secure it to any tree.',
      },
      {
        thumb: treeHuggerThumb3,
        full: treeHuggerFull3,
        title: 'Latchable Rain Guard',
        desc: 'The top overlaps to prevent rain from getting into the feed. There is a latch to hold the top in place and optionally lock it.',
      },{
        thumb: treeHuggerThumb4,
        full: treeHuggerFull4,
        title: 'Side Door Closed',
        desc: 'A side door was added to the feeder to easily access the battery and mechanical hardware.',
      },
      {
        thumb: treeHuggerThumb5,
        full: treeHuggerFull5,
        title: 'Side Door Open',
        desc: 'The side door opens to expose room below the shaker within the feeder.',
      },
      {
        thumb: treeHuggerThumb6,
        full: treeHuggerFull6,
        title: '12 Volt Solar Panel',
        desc: 'A small solar panel is mounted to the top, harnessing energy from the sun to charge a 12 volt battery, which powers a deer feeder.',
      },
      {
        thumb: treeHuggerThumb7,
        full: treeHuggerFull7,
        title: 'Feeding Troff',
        desc: 'An open feeding troff is exposed across the entire front of the feeder to disperse the rice brand.',
      },
      {
        thumb: treeHuggerThumb8,
        full: treeHuggerFull8,
        title: '12 Volt Solar Panel',
        desc: 'A small solar panel is mounted to the top, harnessing energy from the sun to charge a 12 volt battery, which powers a deer feeder.',
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
        title: '5 Feed Chambers',
        desc: 'This feeder consists of 4 gravity chambers around each side and 1 large timer chamber in the center.',
      },
      {
        thumb: fiveInOneThumb2,
        full: fiveInOneFull2,
        title: '12 Volt Solar Panel',
        desc: 'A small solar panel is mounted to the top side, harnessing energy from the sun to charge a 12 volt battery, which powers a deer feeder.',
      },
      {
        thumb: fiveInOneThumb3,
        full: fiveInOneFull3,
        title: 'Poly Sealed View Port',
        desc: 'You will find a view port on each side of the feeder to easily check the level of feed in that specific chamber.',
      },{
        thumb: fiveInOneThumb4,
        full: fiveInOneFull4,
        title: 'Top Handle',
        desc: 'A handle is bent and welded around the top of the cover to allow for one person to swivel the top left and right to expose the chambers.',
      },
      {
        thumb: fiveInOneThumb5,
        full: fiveInOneFull5,
        title: 'Feeding Troff',
        desc: '4 individal covered feeding troffs are on each side of the feeder, protecting from weather, and conserving feed.',
      },
      {
        thumb: fiveInOneThumb6,
        full: fiveInOneFull6,
        title: 'Funnel Drop Door',
        desc: 'The motor is latched and swivels out from the bottom of the feeder to expose the feed funnel for easy access.',
      },
      {
        thumb: fiveInOneThumb7,
        full: fiveInOneFull7,
        title: 'Tow Bar',
        desc: 'The feeder is built on two metal sled bases with a tow bar to latch onto to easily drag and position the feeder with a vehicle.',
      },
      {
        thumb: fiveInOneThumb8,
        full: fiveInOneFull8,
        title: 'Timer Motor Casing',
        desc: 'The battery and motor are stored in an 1/8 in steel casing to protect from boar and the elements.',
      }
    ],
    price: {
      retail: 2250,
      dealer: 1800
    }
  }
];