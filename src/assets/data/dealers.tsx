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
    name: 'Renegade Firearms',
    address: {
        street: '3148 MS-1',
        city: 'Greenville',
        state: 'MS',
        zip: '38701'
    },
    logo: 'logo',
    link: 'https://www.google.com/maps/place/Renegade+Firearms/@33.2912839,-91.0389018,744m/data=!3m1!1e3!4m16!1m9!3m8!1s0x862befb64eefa78b:0x9bdc00414036007!2s3148+MS-1,+Greenville,+MS+38701!3b1!8m2!3d33.291455!4d-91.0378546!10e5!16s%2Fg%2F11q4040wst!3m5!1s0x862befb64f1e449d:0xb413806d652b583f!8m2!3d33.291489!4d-91.037824!16s%2Fg%2F11c5bmw36j?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D',
    position: {
        top: '30',
        left: '84'
    }
  },
  {
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