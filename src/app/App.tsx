import { AppProviders } from "./providers"
import Router from "./router"

export default function App() {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  )
}
