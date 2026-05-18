import { useGetPost } from "../../Hooks/usePost"
import Spinner from "../Spinner"

const Feed = () => {
    const {data,isPending} = useGetPost()
    
    if(isPending){
        <Spinner/>
    }
    
    console.log(data);
  return (
    <div>Feed</div>
  )
}

export default Feed