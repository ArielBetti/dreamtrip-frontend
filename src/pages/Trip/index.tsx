import { useParams } from "react-router-dom"

const Trip = () => {
  const {id} = useParams();
  return (
    <div>Trip {id}</div>
  )
}

export default Trip
