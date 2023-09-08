import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  
  const value = useNotificationValue()

  if (value) {
  return (
    <div className="notification">
      {value}
      
    </div>
  )}
}

export default Notification
