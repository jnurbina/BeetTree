import { create } from 'zustand'
import { getAllActsData } from '../lib/acts';

const useActsStore = create((set) => ({
  actsList: [],
  beatsList: [],
  selectedAct: {},
  selectedActBeats: [],
  updateActsState: async () => {
    const actsData = await getAllActsData();
    set({ actsList: await actsData.actList, beatsList: await actsData.totalBeats})
  },
  updateSelectedAct: (target) => set((state) => ({ selectedAct: target })),
  updateSelectedActBeats: (target) => set((state) => ({ selectedActBeats: target }))
}));

export default useActsStore;