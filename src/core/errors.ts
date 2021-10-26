import { notification } from "antd";
import { createEvent, createStore } from "effector";

export const clearError = createEvent();
export const setError = createEvent<string>();

export const error$ = createStore<string>("")
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

error$.updates.watch((message: string) => {
  notifyError(message);
});

export const notifyError = (message: string) =>
  notification.error({ message, onClose: clearError });
