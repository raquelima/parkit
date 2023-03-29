import TopBar from "./TopBar";
import SideNavBar from "./SideNavBar";

/**
 * Functional component that represents the layout of the application, which consists of a top bar and a side navigation bar.
 * @returns {JSX.Element} JSX Element representing the application layout
 */
function AppLayout() {
  return (
    <>
      <TopBar />
      <SideNavBar />
    </>
  );
}
export default AppLayout;
