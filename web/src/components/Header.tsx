import { Plus, Clipboard } from 'phosphor-react'
import logoImage from '../assets/logo.svg'
import { ButtonDialog } from './ButtonDialog'
import { EditHabits } from './EditHabits'
import { NewHabitForm } from './NewHabitForm'

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="Habits" />
      <div className="flex gap-4">
        <ButtonDialog buttonTitle='Novo hábito' dialogTitle='Criar hábito' icon={<Plus size={20} className='text-violet-500' />}>
          <NewHabitForm />
        </ButtonDialog>
        <ButtonDialog buttonTitle='Visualizar hábitos' dialogTitle='Seus hábitos' icon={<Clipboard size={20} className='text-violet-500' />}>
          <EditHabits />
        </ButtonDialog>
      </div>
    </div>
  )
}