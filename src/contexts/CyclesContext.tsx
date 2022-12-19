import { createContext, ReactNode, useReducer, useState } from 'react'
import { ActionTypes, Cycle, cyclesReducers } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  cycles: Cycle[]
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const [cycleState, dispatch] = useReducer(cyclesReducers, {
    cycles: [],
    activeCycleId: null,
  })

  const { activeCycleId, cycles } = cycleState

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const setSecondsPassed = (seconds: number) => setAmountSecondsPassed(seconds)

  const createNewCycle = ({ minutesAmount, task }: CreateCycleData) => {
    const id = String(crypto.randomUUID())
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })
    setAmountSecondsPassed(0)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    })
  }

  const interruptCurrentCycle = () => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        cycles,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
        setSecondsPassed,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
