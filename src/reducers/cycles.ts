export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export const cyclesReducers = (state: CycleState, action: any) => {
  switch (action.type) {
    case 'ADD_NEW_CYCLE':
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case 'INTERRUPT_CURRENT_CYCLE':
      return {
        ...state,
        activeCycleId: null,
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, interruptedDate: new Date() }
            : cycle,
        ),
      }
    case 'MARK_CURRENT_CYCLE_AS_FINISHED':
      return {
        ...state,
        activeCycleId: null,
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, finishedDate: new Date() }
            : cycle,
        ),
      }
    default:
      return state
  }
}
