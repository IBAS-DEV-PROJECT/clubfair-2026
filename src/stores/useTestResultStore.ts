import { create } from 'zustand';

import type { SubmitTestAnswersResponse } from '../apis/test/testApi';

interface TestResultStore {
  result: SubmitTestAnswersResponse | null;
  setResult: (result: SubmitTestAnswersResponse) => void;
  clearResult: () => void;
}

export const useTestResultStore = create<TestResultStore>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
}));