import { createBrowserRouter } from "react-router";
import { InternalWorkspace } from "./pages/InternalWorkspace";
import { Dashboard } from "./pages/Dashboard";
import { ActiveProposals } from "./pages/ActiveProposals";
import { ProposalWorkspace } from "./pages/ProposalWorkspace";
import { Settings } from "./pages/Settings";
import { Analytics } from "./pages/Analytics";
import { ClientProposal } from "./pages/ClientProposal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: InternalWorkspace,
    children: [
      { index: true, Component: Dashboard },
      { path: "active-proposals", Component: ActiveProposals },
      { path: "proposal/:id", Component: ProposalWorkspace },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/client/:proposalId",
    Component: ClientProposal,
  },
]);