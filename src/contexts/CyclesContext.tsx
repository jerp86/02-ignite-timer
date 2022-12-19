import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  Cycle,
  cyclesReducers,
  ActionTypes,
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles'

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

const LOCAL_STORAGE_KEY = '@ignite-timer:cycles-state-1.0.0'

export const CycleContext = createContext({} as CycleContextType)

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const [cyclesState, dispatch] = useReducer(
    cyclesReducers,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storedStateAsJSON) return JSON.parse(storedStateAsJSON)
    },
  )

  const { activeCycleId, cycles } = cyclesState

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

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON)
  }, [cyclesState])

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
