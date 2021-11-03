export interface IRegistrationResponce {
  registrationCode: string;
  email: string;
}

export interface IUser {
  userId: number;
  vip: boolean;
  registrationType?: string;
  name: string;
  email?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  isBlocked: boolean;
  team?: string;
}

export interface IUserRegistration {
  userId?: number;
  isTestUser?: boolean;
  vip: boolean;
  name: string;
  email?: string;
  password?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  saveCredentials: boolean;
}

export interface IUserRegistration {
  userId?: number;
  isTestUser?: boolean;
  vip: boolean;
  name: string;
  email?: string;
  password?: string;
}
export interface IPlayer extends UserGameStatus {
  moveOrder: 0 | 1 | 2 | 3 | 4;
}
interface UserGameStatus extends IUser {
  gameId: string;
  isActing: boolean;
  doublesRolledAsCombo: number;
  jailed: number;
  unjailAttempts: number;
  meanPosition: number;
  money: number;
  creditPayRound: boolean;
  creditNextTakeRound: number;
  score: number;
  frags: string;
  additionalTime: number;
  timeReduceLevel: number;
  creditToPay: number;
  canUseCredit: boolean;
  userId: number;
}
