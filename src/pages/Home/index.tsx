import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
} from './styles'

export const Home = () => (
  <HomeContainer>
    <form action="">
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <input type="text" id="task" />

        <label htmlFor="minutesAmount">durante</label>
        <input type="number" id="minutesAmount" />

        <span>minutos.</span>
      </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <StartCountdownButton type="submit">
        <Play />
        Começar
      </StartCountdownButton>
    </form>
  </HomeContainer>
)
