import { TIME_SLOTS } from "../data/date.data";

export const getTimeSlotsOptions = () => {
  return TIME_SLOTS.map((slot) => ({
    label: `${slot.start_time.slice(0, 5)} — ${slot.end_time.slice(0, 5)}`,
    value: slot.start_time, 
  }));
};
