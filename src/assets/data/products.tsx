import {TwoInOne} from './feeders/2n1';
import {ThreeInOne} from './feeders/3n1';
import {FourInOne} from './feeders/4n1';
import {FiveInOne} from './feeders/5n1';
import {Woody} from './feeders/woody';
import {CoveyCafe} from './feeders/coveycafe';
import {MealTime} from './feeders/mealtime';


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
  Woody,
  TwoInOne,
  ThreeInOne,
  MealTime,
  FourInOne,
  FiveInOne,
  CoveyCafe,
];