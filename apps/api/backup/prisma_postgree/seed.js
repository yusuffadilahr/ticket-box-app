const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const hashPassword = async (password) => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};




const categoryEvent = [
  {
    id: 1,
    Category: 'Music',
  },
  {
    id: 2,
    Category: 'Expo',
  },
  {
    id: 3,
    Category: 'Sport',
  },
  {
    id: 4,
    Category: 'Comedy',
  },
  {
    id: 5,
    Category: 'Seminar',
  },
];

const dataEvent = [
  {
    // id: 1,
    eventName: 'Indonesia Blockchain Week 2024',
    location: 'The Ritz-Carlton Jakarta, Pacific Place',
    locationUrl: 'https://maps.app.goo.gl/5AEQxiRxMue5gM9TA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    // startEvent: new Date('2024/11/19'),
    // endEvent: new Date('2024/11/19'),
    startEvent: new Date('2024/11/19 09:00:000'),
    endEvent: new Date('2024/11/19 22:00:000'),
    categoryId: 5,
  },
  {
    // id: 2,
    eventName: 'IMBEX - Indonesia Maternity Baby Kids Expo 2024',
    location: 'Jakarta Convention Center',
    locationUrl: 'https://maps.app.goo.gl/gLaUjSgaBTTBmhey8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/29 09:00:000'),
    endEvent: new Date('2024/12/01 21:00:000'),
    // startEvent: new Date('2024/11/29'),
    // endEvent: new Date('2024/12/01'),
    categoryId: 2,
  },
  {
    // id: 3,
    eventName: 'CINTA KALA SENJA - BERNADYA - ADRIAN KHALIF by BENGKELIVE',
    location: 'Bengkel Space, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/7vsfJtye7hNMoRCk6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/12/08 20:00:000'),
    endEvent: new Date('2024/12/08 22:30:000'),
    // startEvent: new Date('2024/12/08'),
    // endEvent: new Date('2024/12/08'),
    categoryId: 1,
  },

  {
    // id: 4,
    eventName: 'BRI Mini Soccer Clash',
    location: 'Mahaka Square',
    locationUrl: 'https://maps.app.goo.gl/1iAiSLJgmu9Zgeoc9',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    // startEvent: new Date('2024/11/24'),
    // endEvent: new Date('2024/11/24'),
    startEvent: new Date('2024/11/24 08:00:000'),
    endEvent: new Date('2024/11/24 12:00:000'),
    categoryId: 3,
  },
  {
    // id: 5,
    eventName: 'P-LAND Twinkle Holiday',
    location: 'AD Premier Ballroom, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/7GLrVi881GpEpXUS9',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/30 10:00:000'),
    endEvent: new Date('2024/12/01 18:30:000'),
    // startEvent: new Date('2024/11/30'),
    // endEvent: new Date('2024/12/01'),
    categoryId: 2,
  },
  {
    // id: 6,
    eventName: 'HOLIMOON 2024',
    location: 'Stadion Merdeka, Gorontalo',
    locationUrl: 'https://maps.app.goo.gl/XxWYu5vQnxqnP7DR9',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/23 10:00:000'),
    endEvent: new Date('2024/11/23 23:00:000'),
    // startEvent: new Date('2024/11/23'),
    // endEvent: new Date('2024/11/23'),
    categoryId: 1,
  },

  {
    // id: 7,
    eventName: 'DANY BLUES',
    location: 'Usmar Ismail Hall, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/uYxMFsrWARauR4UWA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/30 20:00:000'),
    endEvent: new Date('2024/11/30 22:00:000'),
    // startEvent: new Date('2024/11/30'),
    // endEvent: new Date('2024/11/30'),
    categoryId: 4,
  },
  {
    // id: 8,
    eventName: 'Joyland Festival Jakarta 2024',
    location: 'GBK Senayan, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/UgzB9GtqkCzyeU3g9',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/22 15:00:000'),
    endEvent: new Date('2024/11/24 19:00:000'),
    // startEvent: new Date('2024/11/22'),
    // endEvent: new Date('2024/11/24'),
    categoryId: 1,
  },

  {
    // id: 9,
    eventName: 'Djakarta Warehouse Project 2024',
    location: 'JIEXPO Kemayoran, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/Q8ccWNaBtnFnN6URA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/12/13 17:00:000'),
    endEvent: new Date('2024/12/16 03:00:000'),
    // startEvent: new Date('2024/12/13'),
    // endEvent: new Date('2024/12/16'),
    categoryId: 1,
  },

  {
    // id: 10,
    eventName: 'Kontras by Abdur Arsyad - Bogor',
    location: 'Gedung Poetri Ballroom Bogor, Jawa Barat',
    locationUrl: 'https://maps.app.goo.gl/rRm611oKYKm42seR6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/23 19:30:000'),
    endEvent: new Date('2024/11/23 19:22:000'),
    // startEvent: new Date('2024/11/23'),
    // endEvent: new Date('2024/11/23'),
    categoryId: 4,
  },
  {
    // id: 11,
    eventName: 'Kontras by Abdur Arsyad - Balikpapan',
    location: 'Gedung Kesenian Balikpapan, Kalimantan Timur',
    locationUrl: 'https://maps.app.goo.gl/gB3hvWyz5NFrqWeF9',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/12/14 20:30:000'),
    endEvent: new Date('2024/12/14 23:00:000'),
    // startEvent: new Date('2024/12/14'),
    // endEvent: new Date('2024/12/14'),
    categoryId: 4,
  },

  {
    // id: 12,
    eventName: 'Kontras by Abdur Arsyad - Bandung',
    location: 'Teater Tertutup Dago Tea House, Jawa Barat',
    locationUrl: 'https://maps.app.goo.gl/vnLd54kBaTAb7Kxc8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/23 13:00:000'),
    endEvent: new Date('2024/11/23 19:30:000'),
    // startEvent: new Date('2024/11/23'),
    // endEvent: new Date('2024/11/23 '),
    categoryId: 4,
  },

  {
    // id: 13,
    eventName: 'Kontras by Abdur Arsyad - Jakarta',
    location: 'Balai Sarbini, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/cNTcdFYW4LUEhy4X7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2025/02/15 19:30:000'),
    endEvent: new Date('2025/02/15 22:00:000'),
    // startEvent: new Date('2025/02/15'),
    // endEvent: new Date('2025/02/15'),
    categoryId: 4,
  },
  {
    // id: 14,
    eventName: 'Penn Endodontic Global Symposium',
    location: 'Bali International Convention Center, Bali',
    locationUrl: 'https://maps.app.goo.gl/ptFRRZnGC1Jd1yb38',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2025/01/17 08:30:000'),
    endEvent: new Date('2025/01/17 18:00:000'),
    // startEvent: new Date('2025/01/17'),
    // endEvent: new Date('2025/01/17'),
    categoryId: 5,
  },
  {
    // id: 15,
    eventName: 'Workshop BatharaXDiamondArts',
    location: 'Gedung Soejono Kabupaten Lumajang, Jawa Timur',
    locationUrl: 'https://maps.app.goo.gl/BgqKBbzNBT1Y4ftM7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/12/24 18:00:000'),
    endEvent: new Date('2024/12/24 14:00:000'),
    // startEvent: new Date('2024/12/24'),
    // endEvent: new Date('2024/12/24'),
    categoryId: 5,
  },

  {
    // id: 16,
    eventName: 'Flower Workshop Activity - Weekend',
    location: 'Baleton Garden Kemang, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/tWFyZbjWKh4qfPFL8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/10/19  18:00:000'),
    endEvent: new Date('2024/12/19 14:00:000'),
    // startEvent: new Date('2024/10/19'),
    // endEvent: new Date('2024/12/19'),
    categoryId: 5,
  },
  {
    // id: 17,
    eventName: 'LEADERSHIP FOR MANAGERS',
    location: 'Ibis Hotel, Jawa Barat',
    locationUrl: 'https://maps.app.goo.gl/34RWk1MxciWzu1Ay8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/12/17 09:00:000'),
    endEvent: new Date('2024/12/18 17:00:000'),
    // startEvent: new Date('2024/12/17'),
    // endEvent:  new Date('2024/12/18 '),
    categoryId: 5,
  },
  {
    // id: 18,
    eventName: 'HealFest 2024',
    location: 'Tengah People & Place, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/DEf7otBs4GijQukk7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/12/14 09:00:000'),
    endEvent: new Date('2024/12/15 17:00:000'),
    // startEvent: new Date('2024/12/14'),
    // endEvent: new Date('2024/12/15 '),
    categoryId: 1,
  },

  {
    // id: 19,
    eventName: 'INTERNATIONAL AUTOMODIFIED (IAM)',
    location: 'Jakarta Convention Center, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/gLaUjSgaBTTBmhey8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/12/14 10:00:000'),
    endEvent: new Date('2024/12/15 22:00:000'),
    // startEvent: new Date('2024/12/14 '),
    // endEvent: new Date('2024/12/15'),
    categoryId: 2,
  },
  {
    // id: 20,
    eventName: 'GENETIK 2024 VOL.6',
    location: 'SMK KESEHATAN BHAKTI MEDIKA CIANJUR, Jawa Barat',
    locationUrl: 'https://maps.app.goo.gl/KVpHnh5GYQ1LxZ2B8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/12/14 08:00:000'),
    endEvent: new Date('2024/12/14 17:00:000'),
    // startEvent: new Date('2024/12/14'),
    //   endEvent: new Date('2024/12/14 '),
    categoryId: 2,
  },
  {
    // id: 21,
    eventName: 'Professional Football Trials in Indonesia by TFA Elite Dubai',
    location: 'ASIOP Stadium, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/3vavrnRNMiAQVfkaA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/09 08:00:000'),
    endEvent: new Date('2024/11/10 17:00:000'),
    // startEvent: new Date('2024/11/09'),
    // endEvent: new Date('2024/11/10 '),
    categoryId: 3,
  },

  {
    // id: 22,
    eventName: 'Kubernetes Community Days Indonesia 2024',
    location: 'Universitas Nasional, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/WgpV3PVxw7BEMzdPA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    // startEvent: new Date('2024/11/30'),
    // endEvent: new Date('2024/11/30'),
    startEvent: new Date('2024/11/30 08:00:000'),
    endEvent: new Date('2024/11/30 18:00:000'),
    // startEvent: new Date('2024/11/30'),
    // endEvent: new Date('2024/11/30'),
    categoryId: 2,
  },

  {
    // id: 23,
    eventName: 'Building Personal Branding for Startup Founders',
    location: 'Event Space Lv. 11 UMN C Building, Banten',
    locationUrl: 'https://maps.app.goo.gl/a4bJBnWoVg9jh1rHA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/21 17:30:000'),
    endEvent: new Date('2024/11/21 20:30:000'),
    // startEvent: new Date('2024/11/21'),
    // endEvent: new Date('2024/11/21'),
    categoryId: 5,
  },

  {
    // id: 24,
    eventName: 'CREATIVE FEST 2024',
    location: 'Lapangan Rektorat UNG, Gorontalo',
    locationUrl: 'https://maps.app.goo.gl/Sztxone3YMcLbemj8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/18 15:00:000'),
    endEvent: new Date('2024/11/18 23:00:000'),
    // startEvent: new Date('2024/11/18'),
    // endEvent: new Date('2024/11/18'),
    categoryId: 1,
  },

  {
    // id: 25,
    eventName: "WOW Night 2024: Maliq & D'essentials",
    location: 'The Ritz-Carlton Jakarta, Pacific Place, DKI Jakarta',
    locationUrl: 'https://maps.app.goo.gl/5AEQxiRxMue5gM9TA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/19 15:00:000'),
    endEvent: new Date('2024/11/19 23:00:000'),
    // startEvent: new Date('2024/11/19'),
    // endEvent: new Date('2024/11/19'),
    categoryId: 1,
  },

  {
    // id: 26,
    eventName: 'PLN Mobile Green Fest 2024',
    location: 'Mini Stadion Bulukumba, Sulawesi Selatan',
    locationUrl: 'https://maps.app.goo.gl/ZG5kMo7wwnsufUcw7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/20 15:00:000'),
    endEvent: new Date('2024/11/20 23:00:000'),
    // startEvent: new Date('2024/11/20'),
    // endEvent: new Date('2024/11/20'),
    categoryId: 1,
  },

  {
    // id: 27,
    eventName: 'JBRX Sportainment',
    location: 'DOME UMM (Universitas Muhammadiyah Malang), Jawa Timur',
    locationUrl: 'https://maps.app.goo.gl/1rbHX2drBbXtQDWr6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/21 15:00:000'),
    endEvent: new Date('2024/11/21 23:00:000'),
    // startEvent: new Date('2024/11/21'),
    // endEvent: new Date('2024/11/21'),
    categoryId: 3,
  },

  {
    // id: 28,
    eventName: 'FunBike Hari Pahlawan 2024',
    location: 'Taman Pasir Putih Boulevard Manado, Sulawesi Utara',
    locationUrl: 'https://maps.app.goo.gl/wGEuBn5MQEHdGfmE7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/22 15:00:000'),
    endEvent: new Date('2024/11/22 23:00:000'),
    // startEvent: new Date("2024/11/22"),
    // endEvent: new Date('2024/11/22'),
    categoryId: 3,
  },
  {
    // id: 29,
    eventName: 'Carnival 2024',
    location: 'Lagoi Bay, Kepulauan Riau',
    locationUrl: 'https://maps.app.goo.gl/8xqHugzBnVezUtwj9',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/23 15:00:000'),
    endEvent: new Date('2024/11/24 23:00:000'),
    // startEvent: new Date('2024/11/23'),
    // endEvent: new Date('2024/11/24'),
    categoryId: 1,
  },
  {
    // id: 30,
    eventName: 'LAMPUNG NIGHT FAIR bersama JUICY LUICY',
    location: 'Lapangan Saburai, Lampung',
    locationUrl: 'https://maps.app.goo.gl/Dpj5T7piER1z9pS19',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPaid: true,
    startEvent: new Date('2024/11/24 15:00:000'),
    endEvent: new Date('2024/11/25 23:00:000'),
    // startEvent: new Date('2024/11/24'),
    // endEvent: new Date('2024/11/25'),
    categoryId: 1,
  },

];

const dataEventOrganizer = [
  {
    organizerName: 'SEKELIK FEST',
    ownerName: 'Budiman',
    email: 'sekelik@gmail.com',
    role: 'EO',
    phoneNumber: '628563213213',
    identityNumber: '123123123',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20240927191223_66f6a127052fb.png',
  },
  {
    organizerName: 'RX INDONESIA',
    ownerName: 'Joni',
    email: 'rx@gmail.com',
    role: 'EO',
    phoneNumber: '6284965423213',
    identityNumber: '234234234',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20230617034447.jpg',
  },
  {
    organizerName: 'Bengkel Space',
    ownerName: 'Toto',
    email: 'bengkel@gmail.com',
    role: 'EO',
    phoneNumber: '622342352',
    identityNumber: '345345345',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20220509153707_6278d2b381650.png',
  },
  {
    organizerName: 'COMIKA EVENT',
    ownerName: 'Tomi',
    email: 'comika@gmail.com',
    role: 'EO',
    phoneNumber: '62234234523',
    identityNumber: '456456456',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20220304170257_6221e3d1169c9.png',
  },
  {
    organizerName: 'Ismaya Live',
    ownerName: 'Jaja',
    email: 'ismaya@gmail.com',
    role: 'EO',
    phoneNumber: '6234234235',
    identityNumber: '567575672',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/ZnRxl_1730200988592819.jpeg',
  },
  {
    organizerName: 'Deal Indonesia',
    ownerName: 'Celine',
    email: 'deal@gmail.com',
    role: 'EO',
    phoneNumber: '62234234324',
    identityNumber: '678678678',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20240404153109_660e654d3c31b.png',
  },
  {
    organizerName: 'IAM Automodified',
    ownerName: 'Rara',
    email: 'iam@gmail.com',
    role: 'EO',
    phoneNumber: '6223424562',
    identityNumber: '789789789',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20230921143028_650bf11414744.png',
  },
  {
    organizerName: 'CNCF Indonesia',
    ownerName: 'Bian',
    email: 'cncf@gmail.com',
    role: 'EO',
    phoneNumber: '62756756756',
    identityNumber: '890890890',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20240912213251_66e2fb93194b2.png',
  },
  {
    organizerName: 'Marketeers',
    ownerName: 'Gofar',
    email: 'marketeers@gmail.com',
    role: 'EO',
    phoneNumber: '62567568567',
    identityNumber: '235235235',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20220914154833_6321956146ea8.jpg',
  },
  {
    organizerName: 'Dilantern',
    ownerName: 'Palim',
    email: 'dilantern@gmail.com',
    role: 'EO',
    phoneNumber: '62567568567',
    identityNumber: '457457457',
    profilePicture:
      'https://assets.loket.com/neo/production/images/organization/20181005183517_5bb74c756308b.png',
  },
];

// const categoryEvent = [
//   {
//     id: 1,
//     Category: 'Music',
//   },
//   {
//     id: 2,
//     Category: 'Expo',
//   },
//   {
//     id: 3,
//     Category: 'Sport',
//   },
//   {
//     id: 4,
//     Category: 'Comedy',
//   },
//   {
//     id: 5,
//     Category: 'Seminar',
//   },
// ];

const eventImages = [
  // 1

  {
    // id: 1,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240906150431_66dab78f5e1ea.jpg',
    eventsId: 1,
  },
  {
    // id: 2,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/IpEmF_1730096332212218.jpeg',
    eventsId: 2,
  },
  {
    // id: 3,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241029131528_67207d8061df8.jpg',
    eventsId: 3,
  },

  {
    // id: 4,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/XS6XW_1730453108607371.jpeg',
    eventsId: 4,
  },
  {
    // id: 5,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241024143344_6719f8584b766.jpg',
    eventsId: 5,
  },
  {
    // id: 6,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241019183718_671399eea31a2.jpg',
    eventsId: 6,
  },

  {
    // id: 7,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240830161020_66d18c7c8a4d9.jpg',
    eventsId: 7,
  },
  {
    // id: 8,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240503020209.png',
    eventsId: 8,
  },

  {
    // id: 9,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/K7TEz_1724747212487826.png',
    eventsId: 9,
  },

  {
    // id: 10,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240701193913_6682a37109a2c.jpg',
    eventsId: 10,
  },
  {
    // id: 11,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240701193959_6682a39fe8439.jpg',
    eventsId: 11,
  },
  {
    // id: 12,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240701194020_6682a3b4c2565.jpg',
    eventsId: 12,
  },

  {
    // id: 13,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240702140535_6683a6bf45041.jpg',
    eventsId: 13,
  },
  {
    // id: 14,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240706023824_66884bb0e1ad3.jpg',
    eventsId: 14,
  },
  {
    // id: 15,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241021200710_671651fed150d.jpg',
    eventsId: 15,
  },

  {
    // id: 16,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241017123209_6710a159975fe.jpg',
    eventsId: 16,
  },
  {
    // id: 17,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20231127132448_6564363037f8a.jpg',
    eventsId: 17,
  },
  {
    // id: 18,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241015095918_670dda86f0298.jpg',
    eventsId: 18,
  },

  {
    // id: 19,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240912130049_66e2839150dce.jpg',
    eventsId: 19,
  },
  {
    // id: 20,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240921202020_66eec8146460e.jpg',
    eventsId: 20,
  },
  {
    // id: 21,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240730144002_66a898d2c7519.jpg',
    eventsId: 21,
  },

  {
    // id: 22,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240916194452_66e82844224c9.jpg',
    eventsId: 22,
  },
  {
    // id: 23,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241023135444_67189db450121.jpg',
    eventsId: 23,
  },
  {
    // id: 24,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241023011431_6717eb87c5104.jpg',
    eventsId: 24,
  },

  {
    // id: 25,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241009092643_6705e9e3f0342.jpg',
    eventsId: 25,
  },
  {
    // id: 26,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241023011431_6717eb87c5104.jpg',
    eventsId: 26,
  },
  {
    // id: 27,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241017150214_6710c4866ae0f.jpg',
    eventsId: 27,
  },

  {
    // id: 28,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241026175722_671ccb1248251.jpg',
    eventsId: 28,
  },
  {
    // id: 29,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20241011182215_67090a6790513.jpg',
    eventsId: 29,
  },
  {
    // id: 30,
    eventImageUrl:
      'https://assets.loket.com/neo/production/images/banner/20240927192227_66f6a3835595e.jpg',
    eventsId: 30,
  },

];

const ticketArr = [
  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },

  {
    price: 150000,
    ticketName: 'Regular',
    ticketType: 'Standard',
    seatAvailable: 50,
    totalSeat: 50,
    version: 'v1.0',
    discount: 10,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 250000,
    ticketName: 'VIP',
    ticketType: 'Premium',
    seatAvailable: 20,
    totalSeat: 20,
    version: 'v1.0',
    discount: 15,
    startDate: new Date('2024-11-10T08:00:00Z'),
    endDate: new Date('2024-11-10T18:00:00Z'),
  },
  {
    price: 100000,
    ticketName: 'Student',
    ticketType: null,
    seatAvailable: 30,
    totalSeat: 30,
    version: 'v1.1',
    discount: 5,
    startDate: new Date('2024-12-01T08:00:00Z'),
    endDate: new Date('2024-12-01T18:00:00Z'),
  },
];

async function main() {
  let eventIndex = 0; // Initialize event index to track the current event



  for (let i = 0; i < categoryEvent.length; i++) {
    const category = categoryEvent[i];
    await prisma.category.create({
      data: category,
    });
  }

  // Loop through each event organizer
  for (let i = 0; i < dataEventOrganizer.length; i++) {
    const organizer = dataEventOrganizer[i];

    // Create the EventOrganizer
    const createdOrganizer = await prisma.eventOrganizer.create({
      data: { ...organizer, password: await hashPassword('12312312'), isVerified: false },
    });

    // Assign 3 events to the current organizer
    for (let j = 0; j < 3; j++) {
      if (eventIndex >= dataEvent.length) break; // Safety check to avoid out-of-bounds

      const event = dataEvent[eventIndex];
      const eventImage = eventImages[eventIndex];

      // Create the Event with the linked EventOrganizer
      const createdEvent = await prisma.event.create({
        data: { ...event, eventOrganizerId: createdOrganizer.id },
      });

      // Create the associated EventImage for this Event
      await prisma.eventImages.create({
        data: { ...eventImage, eventsId: createdEvent.id },
      });

      // Assign 3 tickets to each event by cycling through the `ticketArr`
      for (let k = 0; k < 3; k++) {
        const ticketIndex = (eventIndex * 3 + k) % ticketArr.length; // Cycle through `ticketArr`
        const ticket = ticketArr[ticketIndex];

        // Create a ticket for this Event
        await prisma.tickets.create({
          data: { ...ticket, eventId: createdEvent.id },
        });
      }

      eventIndex++; // Move to the next event
    }
  }
}

main()
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
