import {TwoInOne} from './feeders/2n1';
import {ThreeInOne} from './feeders/3n1';
import {FourInOne} from './feeders/4n1';
import {FiveInOne} from './feeders/5n1';
import {XXX} from './feeders/xxx';
import {OneInOne} from './feeders/1n1';
import {CoveyCafe} from './feeders/coveycafe';
import {RiceBrand} from './feeders/ricebrand';
import {DuelTray} from './feeders/dueltray';
import {BackYard} from './feeders/backyard';
import {DockFeeder} from './feeders/dockfeeder';

export type price = {
  retail: number,
  dealer?: number
}

export type productImage = {
  thumb: string,
  full: string,
  title: string,
  desc: string,
}

export type productType = {
  name: string,
  image: string,
  slug: string,
  blueprint: string,
  description: string,
  specs: string[],
  photos: productImage[]
  price: price
}

export type productInquiryItem = {
  name: string,
  qty?: string,
  price: price
}

export const productData = [
  OneInOne,
  TwoInOne,
  ThreeInOne,
  FourInOne,
  FiveInOne,
  XXX,
  RiceBrand,
  DuelTray,
  BackYard,
  DockFeeder,
  CoveyCafe,
];