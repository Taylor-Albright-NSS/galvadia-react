import { UI } from './components/ui/UI'
import './App.css'
import { WebSocketProvider } from './components/ui/WebSocketProvider'

export const App = () => {

  return (
    <WebSocketProvider>
      <UI />
    </WebSocketProvider>
  )
}
