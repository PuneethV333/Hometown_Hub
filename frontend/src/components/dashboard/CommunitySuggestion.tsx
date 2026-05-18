import { useGetSuggestedCommunities } from "../../Hooks/useCommunity";
import Spinner from "../Spinner";

const CommunitySuggestion = () => {
  const { data, isPending } = useGetSuggestedCommunities();

  if (isPending) {
    <Spinner />;
  }

  console.log(data);

  return <div>CommunitySuggestion</div>;
};

export default CommunitySuggestion;
