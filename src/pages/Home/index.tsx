import { Play } from 'phosphor-react'

export const Home = () => (
  <div>
    <form action="">
      <div>
        <label htmlFor="task">Vou trabalhar em</label>
        <input type="text" id="task" />

        <label htmlFor="minutesAmount">durante</label>
        <input type="number" id="minutesAmount" />

        <span>minutos.</span>
      </div>

      <div>
        <span>0</span>
        <span>0</span>
        <span>:</span>
        <span>0</span>
        <span>0</span>
      </div>

      <button type="submit">
        <Play />
        Começar
      </button>
    </form>
  </div>
)
