import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { removeLoggedUser, removeToken } from '@/redux/user.slice'

export const useLogout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = async () => {
    localStorage.removeItem('token')
    dispatch(removeToken())

    dispatch(removeLoggedUser())
    localStorage.removeItem('user')

    navigate('/login')
  }

  return { onLogout }
}
