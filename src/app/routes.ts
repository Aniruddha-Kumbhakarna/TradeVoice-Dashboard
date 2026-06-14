import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { UserManagement } from "./components/UserManagement";
import { LineManagement } from "./components/LineManagement";
import { TurretsWrapper } from "./components/TurretsWrapper";
import { SystemStatus } from "./components/SystemStatus";
import { Support } from "./components/Support";
import { ChangeCalendar } from "./components/ChangeCalendar";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "users", Component: UserManagement },
      { path: "lines", Component: LineManagement },
      { path: "turrets", Component: TurretsWrapper },
      { path: "status", Component: SystemStatus },
      { path: "change-calendar", Component: ChangeCalendar },
      { path: "support", Component: Support },
    ],
  },
]);