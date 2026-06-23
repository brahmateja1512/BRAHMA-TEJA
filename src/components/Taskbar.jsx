import { useOSStore } from '../store/osStore'
import * as Icons from 'lucide-react'

export default function Taskbar() {
  const { apps, openWindows, openApp, focusedWindow } = useOSStore()

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-16 bg-os-panel backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl flex items-center px-4 gap-4 z-[9999]">
      {apps.map(app => {
        const isOpen = openWindows.includes(app.id)
        const isFocused = focusedWindow === app.id
        const IconComponent = Icons[app.icon] || Icons.HelpCircle

        return (
          <div 
            key={app.id}
            onClick={() => openApp(app.id)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 relative ${isFocused ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <IconComponent size={24} className={isOpen ? 'text-os-accent' : 'text-white/70'} />
            {isOpen && (
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isFocused ? 'bg-os-accent shadow-[0_0_8px_rgba(203,166,247,0.8)]' : 'bg-white/50'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
