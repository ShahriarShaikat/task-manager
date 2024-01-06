import ProjectSection from "./ProjectSection";
import TeamSection from "./TeamSection";

function Sidebar() {
  return (
    <div className="sidebar">
      <ProjectSection />
      <TeamSection />
    </div>
  );
}
export default Sidebar;
