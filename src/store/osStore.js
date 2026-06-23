import { create } from 'zustand'

export const useOSStore = create((set) => ({
  apps: [
    { id: 'about', title: 'About Me', icon: 'User' },
    { id: 'projects', title: 'Projects', icon: 'Briefcase' },
    { id: 'terminal', title: 'Terminal', icon: 'TerminalSquare' },
    { id: 'contact', title: 'Contact', icon: 'Mail' }
  ],
  openWindows: [],
  focusedWindow: null,
  
  openApp: (id) => set((state) => {
    if (state.openWindows.includes(id)) {
      return { focusedWindow: id }
    }
    return {
      openWindows: [...state.openWindows, id],
      focusedWindow: id
    }
  }),
  
  closeApp: (id) => set((state) => ({
    openWindows: state.openWindows.filter(w => w !== id),
    focusedWindow: state.focusedWindow === id ? state.openWindows.filter(w => w !== id)[0] || null : state.focusedWindow
  })),
  
  focusWindow: (id) => set({ focusedWindow: id })
}))
