export type dealerType = {
  name: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  logo: string
  link: string,
  position: {
    top: string,
    left: string
  }
}

export const dealerData = [
  {
    name: 'Philips Forest Products',
    address: {
        street: '13431 US-82',
        city: 'De Kalb',
        state: 'TX',
        zip: '75559'
    },
    logo: 'logo',
    link: 'https://store.phillipsforestproducts.com/',
    position: {
        top: '29',
        left: '57'
    }
  },
  {
    name: 'J and L Sales',
    address: {
        street: '116 Southeast Fifth Street',
        city: 'Cross Plains',
        state: 'TX',
        zip: '76443'
    },
    logo: 'logo',
    link: 'https://jandlsales.com/',
    position: {
        top: '40',
        left: '35'
    }
  },
  {
    name: `Huntin' Store`,
    address: {
        street: '1306 I-20 West',
        city: 'Cisco',
        state: 'TX',
        zip: '76437'
    },
    logo: 'logo',
    link: 'link',
    position: {
        top: '38',
        left: '38'
    }
  },
  {
    name: 'Oklaunion Outdoors',
    address: {
        street: '7357 FM1763',
        city: 'North Harrold',
        state: 'TX',
        zip: '76364'
    },
    logo: 'logo',
    link: 'https://www.makemonsterdeer.com/',
    position: {
        top: '25',
        left: '35'
    }
  },
  {
    name: 'Vans Outdoors',
    address: {
        street: '777 Highway 468',
        city: 'Brandon',
        state: 'MS',
        zip: '39042'
    },
    logo: 'logo',
    link: 'https://vansoutdoorsbrandon.com/',
    position: {
        top: '35',
        left: '85'
    }
  },
  {
    name: 'Potts Feed Store',
    address: {
        street: '119 N Texas Street',
        city: 'Emory',
        state: 'TX',
        zip: '75440'
    },
    logo: 'logo',
    link: 'https://pottsfeedstore.com/',
    position: {
        top: '33',
        left: '53'
    }
  }
];