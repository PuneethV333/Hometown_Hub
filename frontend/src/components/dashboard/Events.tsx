import { useGetEvents } from "../../Hooks/useEvent"
import Spinner from "../Spinner"

const Events = () => {
    const {data,isPending} = useGetEvents()
    
    if(isPending){
        <Spinner/>
    }
    
    console.log(data);
    
    
  return (
    <div>Events</div>
  )
}

export default Events