export type dealerAddressType = {
  street: string
  city: string
  state: string
  zip: string
}

export type dealerType = {
  slug: string
  name: string
  address: dealerAddressType
  logo: string
  link: string
  position: {
    top: string
    left: string
  }
}

export const dealerData: dealerType[] = [
  {
    slug: 'renegade-firearms',
    name: 'Renegade Firearms',
    address: {
        street: '3148 MS-1',
        city: 'Greenville',
        state: 'MS',
        zip: '38701'
    },
    logo: 'logo',
    link: 'link',
    position: {
        top: '30',
        left: '84'
    }
  },
  {
    slug: 'delta-outdoors',
    name: 'Delta Outdoors',
    address: {
        street: '3755 Hwy 61 North',
        city: 'Cleveland',
        state: 'MS',
        zip: '38732'
    },
    logo: 'logo',
    link: 'https://www.deltaoutdoors.com/',
    position: {
        top: '18',
        left: '84'
    }
  },
  {
    slug: 'russell-feed-supply-decatur',
    name: 'Russell Feed & Supply Decatur',
    address: {
        street: '1817 US-287',
        city: 'Decatur',
        state: 'TX',
        zip: '76234'
    },
    logo: 'logo',
    link: 'https://www.russellfeed.com/',
    position: {
        top: '31',
        left: '48'
    }
  },
  {
    slug: 'j-and-l-sales',
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
    slug: 'huntin-store',
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
    slug: 'oklaunion-outdoors',
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
    slug: 'wes-tex-steel',
    name: 'Wes-Tex Steel Inc.',
    address: {
        street: '88029 I-20',
        city: 'Santo',
        state: 'TX',
        zip: '76472'
    },
    logo: 'logo',
    link: 'https://vansoutdoorsbrandon.com/',
    position: {
        top: '36',
        left: '43'
    }
  },
  {
    slug: 'potts-feed-store',
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