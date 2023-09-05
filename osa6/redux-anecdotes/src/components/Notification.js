import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  console.log('notif', notification)
  
  const style = {
    height: 55,
  }

  if (notification) {
     return (
    <div className='notification'>

      {notification}  
      </div>
    )
  }else{
    return (
    <div style={style}>

    </div>
    )
  }
}

export default Notification