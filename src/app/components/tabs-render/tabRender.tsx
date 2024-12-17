import SelectedTab from "./selectedTab";
import TabHeaders from "./tabHeaders";

export default function TabRender() {
  return (
    <div className="flex flex-col flex-1 gap-3 mt-3">
      <TabHeaders />
      <SelectedTab />
    </div>
  );
}
