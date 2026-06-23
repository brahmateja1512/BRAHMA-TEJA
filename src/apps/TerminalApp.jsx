import { useState, useRef, useEffect } from 'react'

export default function TerminalApp() {
  const [history, setHistory] = useState([{ type: 'system', text: 'BrahmaOS Terminal v2.0. Type "help" for a list of commands.' }])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase()
      const newHistory = [...history, { type: 'user', text: `root@brahma-os:~$ ${input}` }]
      
      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'system', text: 'Available commands: help, whoami, clear, echo, date' })
          break
        case 'whoami':
          newHistory.push({ type: 'system', text: 'You are a guest user accessing Brahma Teja Jampu\'s portfolio.' })
          break
        case 'date':
          newHistory.push({ type: 'system', text: new Date().toString() })
          break
        case 'clear':
          setHistory([])
          setInput('')
          return
        default:
          if (cmd.startsWith('echo ')) {
            newHistory.push({ type: 'system', text: input.slice(5) })
          } else if (cmd !== '') {
            newHistory.push({ type: 'error', text: `Command not found: ${cmd}` })
          }
      }
      setHistory(newHistory)
      setInput('')
    }
  }

  return (
    <div className="font-mono text-sm h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 pb-4">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'error' ? 'text-red-400' : line.type === 'user' ? 'text-green-400' : 'text-gray-300'}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-2 mt-auto text-green-400 border-t border-white/10 pt-4">
        <span>root@brahma-os:~$</span>
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  )
}
