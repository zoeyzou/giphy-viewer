import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom"
import { ExplorerPage } from "@/pages/explorer"

const router = createBrowserRouter([{ path: "/", element: <ExplorerPage /> }])

export default function Router() {
  return <ReactRouterProvider router={router} />
}
