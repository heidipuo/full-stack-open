const Notification = (props) => {
  if (props.message === '') {
    return null
  }

  return (
    <div className={props.style}> {props.message}</div>
  )
}

export default Notification