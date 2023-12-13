import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { findUserById, postLogin } from '@/services/user/user.service'
import { selectLoggedUser, setLoggedUser, setToken } from '@/redux/user.slice'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const loggedUser = useSelector(selectLoggedUser)

  const onLogin = async (username: string, password: string) => {
    const { token, id } = await postLogin(username, password)

    localStorage.setItem('token', token)
    dispatch(setToken(token))

    const user = await findUserById(id)
    if (user === null) return

    dispatch(setLoggedUser(user))
    localStorage.setItem('user', JSON.stringify(user))

    navigate('/home')
  }

  return { loggedUser, onLogin }
}
