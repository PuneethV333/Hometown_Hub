import Spinner from "../components/Spinner";
import { Auth } from "../config/firebase.config";
import { useGetMe } from "../Hooks/useGetMe";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding =  () => {
    const navigate = useNavigate()
    const authData = Auth.currentUser
    const {data:user,isPending} = useGetMe()
    
    const [email,setEmail] = useState<string | null|undefined>(authData?.email )
    const [name,setName] = useState<string|null|undefined>(authData?.displayName)
    const [phoneNumber,setPhoneNumber] = useState<string>(authData?.phoneNumber ?? "")
    const [gender,setGender] = useState<"Male"|"Female"|null>()
    
    console.log(authData);
    
    
    
    if(isPending){
        <Spinner/>
    }
  
  if(user?.isProfileComplete){
    navigate("/home")
  }
  
  console.log(user);
  
  
  
  

  return <div>Onboarding</div>;
};

export default Onboarding;
