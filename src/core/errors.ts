import { notification } from "antd";
import { createEvent, createStore } from "effector";
export enum ErrorCode {
  "Not enough money" = 101,
  "Company has owner" = 102,
  "Wrong tranactionId" = 103,
  "Not user field" = 104,
  "Field is mortgaged" = 105,
  "Not my turn" = 106,
  "Cannot mortgage field" = 107,
  "Cannot unmortgage field" = 108,
  "Max field level" = 109,
  "Cannot build branch" = 110,
  "No monopoly" = 111,
  "Cannot start auction" = 112,
  "Cannot proceed contract" = 113,
  "Room already exists" = 114,
  "Room doesn`t exist" = 115,
  "Max players reached" = 116,
  "Only for VIP" = 117,
  "User not found" = 118,
  "Fields not found" = 119,
  "Wrong room id" = 120,
  "Wrong login or password" = 121,
  "User already exists" = 122,
  "Registration copde is wrong" = 123,
  "Registration code could not be sent" = 124,
  "Email not found" = 125,
  "Login to create room" = 401,
  "Room not found" = 1000,
  "Player not found" = 1001,
  "Field not found" = 1002,
}

export const clearError = createEvent();
export const setError = createEvent<number>();

export const error$ = createStore<number>(0)
  .on(setError, (_, v: any) => {
    if (
      v.error.response &&
      v.error.response.data &&
      v.error.response.data.message
    ) {
      return v.error.response.data.message;
    } else {
      return v.error.message;
    }
  })
  .reset(clearError);

error$.updates.watch((code: number) => {
  notifyError(code);
});

export const notifyError = (code: number) =>
  notification.error({ message: ErrorCode[code], onClose: clearError });
