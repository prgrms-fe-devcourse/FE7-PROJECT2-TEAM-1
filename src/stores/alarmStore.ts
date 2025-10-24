import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { allReadAPI, fetchAlarmsAPI } from "../services/alarm";

type AlarmStore = {
  isOpen: boolean;
  openModal: boolean;
  alarms: Alarm[];
  unReadCount: number;
  setOpenModal: (value: boolean) => void;
  setUnReadCount: (value: number | ((prev: number) => number)) => void;
  setIsOpen: (value: boolean) => void;
  setAlarms: (alarms: Alarm[] | []) => void;
  addAlarm: (alarm: Alarm) => void;
  getAlarms: (uid: string) => Promise<Alarm[]>;
  allReadAlarm: (uid: string) => Promise<void>;
};

export const useAlarmStore = create<AlarmStore>()(
  immer((set) => ({
    isOpen: false,
    alarms: [],
    openModal: false,
    unReadCount: 0,
    setOpenModal: (value) =>
      set((state) => {
        state.openModal = value;
      }),
    setUnReadCount: (value: number | ((prev: number) => number)) =>
      set((state) => {
        state.unReadCount = typeof value === "function" ? value(state.unReadCount) : value;
      }),
    setIsOpen: (value) =>
      set((state) => {
        state.isOpen = value;
      }),
    setAlarms: (alarms) =>
      set((state) => {
        state.alarms = alarms;
      }),
    addAlarm: (alarm) => {
      set((state) => {
        state.alarms.unshift(alarm);
      });
    },
    getAlarms: async (uid: string) => {
      const data = await fetchAlarmsAPI(uid);
      if (data)
        set((state) => {
          state.alarms = data;
        });
      return data as Alarm[];
    },
    allReadAlarm: async (uid: string) => {
      await allReadAPI(uid);
    },
  })),
);
