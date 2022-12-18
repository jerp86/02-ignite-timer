import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
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

const newCycleFormValidationSchema = z.object({
  task: z.string().min(3, 'Informe a tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser no mínimo 5 minutos. ')
    .max(60, 'O ciclo precisa ser no máximo 60 minutos.'),
})

export type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset, watch } = newCycleForm
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

  const handleCreateNewCycle = ({ minutesAmount, task }: NewCycleFormData) => {
    const id = String(new Date().getTime()) // alterar para crypto.randomUUID()
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    // setAmountSecondsPassed(0)

    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

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
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CycleContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
