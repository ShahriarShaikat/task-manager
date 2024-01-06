import Member from "../list-item/Member";
import { useGetTeamsQuery } from "../../features/team/teamAPI";

function TeamList() {
  const { data: team, isLoading, isError, error } = useGetTeamsQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div className="col-span-12">Loading...</div>;
  }

  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }

  if (!isLoading && !isError && team?.length === 0) {
    content = <div className="col-span-12">No team member found</div>;
  }

  if (!isLoading && !isError && team?.length > 0) {
    content = team.map((team) => <Member key={team.id} team={team} />);
  }

  return <div className="mt-3 space-y-4">{content}</div>;
}
export default TeamList;
