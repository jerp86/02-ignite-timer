import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { NewCycleForm, Countdown } from './components'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycle?.id
          ? { ...cycle, finishedDate: new Date() }
          : cycle,
      ),
    )
  }

  // const handleCreateNewCycle = ({ minutesAmount, task }: NewCycleFormData) => {
  //   const id = String(new Date().getTime()) // alterar para crypto.randomUUID()
  //   const newCycle: Cycle = {
  //     id,
  //     task,
  //     minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)

  //   reset()
  // }

  // const task = watch('task')
  // const isSubmitDisabled = !task

  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycle?.id
          ? { ...cycle, interruptedDate: new Date() }
          : cycle,
      ),
    )

    setActiveCycleId(null)
  }

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */>
        <CycleContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          <NewCycleForm />
          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
            <Play />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
