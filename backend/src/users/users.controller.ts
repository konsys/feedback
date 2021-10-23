import { Controller, Get } from '@nestjs/common';

const initialUsers = [
  {
    id: 1,
    fullName: 'Ivan',
    status: 'Free',
    followed: false,
    avatar:
      'https://yt3.ggpht.com/ytc/AKedOLTgi2urvIo5upKg12D_DTovMiC94heiBBUIP51sXdc=s900-c-k-c0x00ffffff-no-rj',
    location: { country: 'Russia', city: 'Minsk' },
  },
  {
    id: 2,
    fullName: 'Dmitry',
    status: 'Free',
    followed: false,
    avatar:
      'https://yt3.ggpht.com/ytc/AKedOLTgi2urvIo5upKg12D_DTovMiC94heiBBUIP51sXdc=s900-c-k-c0x00ffffff-no-rj',
    location: { country: 'Russia', city: 'Minsk' },
  },
  {
    id: 3,
    fullName: 'Sasha',
    status: 'Free',
    followed: false,
    avatar:
      'https://yt3.ggpht.com/ytc/AKedOLTgi2urvIo5upKg12D_DTovMiC94heiBBUIP51sXdc=s900-c-k-c0x00ffffff-no-rj',
    location: { country: 'Russia', city: 'Minsk' },
  },
  {
    id: 4,
    fullName: 'Sergey',
    status: 'Free',
    followed: false,
    avatar:
      'https://yt3.ggpht.com/ytc/AKedOLTgi2urvIo5upKg12D_DTovMiC94heiBBUIP51sXdc=s900-c-k-c0x00ffffff-no-rj',
    location: { country: 'Russia', city: 'Minsk' },
  },
];

interface ILocation {
  country: string;
  city: string;
}

interface IUser {
  id: number;
  fullName: string;
  status: string;
  followed: boolean;
  avatar: string;
  location: ILocation;
}

interface IUsersResponce {
  items: IUser[];
}

@Controller('users')
export class UsersController {
  @Get()
  findAll(): IUsersResponce {
    return { items: initialUsers };
  }
}
