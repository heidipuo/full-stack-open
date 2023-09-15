import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'

const UserInfo = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const logout = (event) => {
    event.preventDefault()
    console.log('logging out', user.username)
    dispatch(handleLogout())
  }

  return (
    <p style={{ marginBottom: 20 }}>
      {user.name} logged in <button onClick={logout}>logout</button>
    </p>
  )
}

export default UserInfo
