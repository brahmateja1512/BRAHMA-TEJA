import { useOSStore } from './store/osStore'
import DesktopIcon from './components/DesktopIcon'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import AboutApp from './apps/AboutApp'
import ProjectsApp from './apps/ProjectsApp'
import TerminalApp from './apps/TerminalApp'
import ContactApp from './apps/ContactApp'

const AppComponents = {
  about: AboutApp,
  projects: ProjectsApp,
  terminal: TerminalApp,
  contact: ContactApp
}

function App() {
  const { apps, openWindows } = useOSStore()

  return (
    <div className="w-screen h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[#1e1e2e] to-[#11111b] text-white">
      {/* Desktop Area */}
      <div className="flex-1 p-4 flex flex-col gap-4 flex-wrap content-start z-0">
        {apps.map(app => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Windows Area */}
      {openWindows.map(id => {
        const AppComponent = AppComponents[id]
        const appInfo = apps.find(a => a.id === id)
        return (
          <Window key={id} id={id} title={appInfo?.title || 'Window'}>
            {AppComponent ? <AppComponent /> : <div className="p-4 text-white">App Content Loading...</div>}
          </Window>
        )
      })}

      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}

export default App
