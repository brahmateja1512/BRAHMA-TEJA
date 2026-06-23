import { useOSStore } from '../store/osStore'
import * as Icons from 'lucide-react'

export default function DesktopIcon({ app }) {
  const { openApp } = useOSStore()
  const IconComponent = Icons[app.icon] || Icons.HelpCircle

  return (
    <div 
      className="flex flex-col items-center gap-2 w-24 p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
      onDoubleClick={() => openApp(app.id)}
    >
      <div className="w-14 h-14 bg-os-panel backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg text-os-accent">
        <IconComponent size={32} />
      </div>
      <span className="text-white text-sm font-medium drop-shadow-md text-center">{app.title}</span>
    </div>
  )
}
