import SelectedTab from "./selectedTab";
import TabHeaders from "./tabHeaders";

export default function TabRender() {
  return (
    <div className="flex-1 mt-2">
      <TabHeaders />
      <SelectedTab />
    </div>
  );
}
