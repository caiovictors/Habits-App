
import './styles/global.css';

import { Habit } from './components/Habit'

function App() {
  return (
    <div>
      <Habit completed={2} />
      <Habit completed={20} />
      <Habit completed={200} />
    </div>
  )
}

export default App
