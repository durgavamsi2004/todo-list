import { useState, useEffect } from 'react'
import './App.css'
import CircularCounter from './components/CircularCounter'
import TaskItem from './components/TaskItem'

const RANDOM_EMOJIS = [
  '📝', '✅', '🔥', '🌟', '🚀', '🎯', '💡', '📅', '⏰', '📌', '🧠', '📋', '🔔', '⭐', '💪', '🎉', '🕒', '📖', '🗂️', '🛠️'
]

function getTodayDate() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}
function getNowTime() {
  const d = new Date()
  return d.toTimeString().slice(0, 5)
}
function getDayOfWeek(dateStr) {
  if (!dateStr) return ''
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const d = new Date(dateStr)
  return days[d.getDay()]
}

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [desc, setDesc] = useState('')
  const [due, setDue] = useState(getTodayDate())
  const [time, setTime] = useState(getNowTime())
  const [filter, setFilter] = useState('all')
  const [editIdx, setEditIdx] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editDue, setEditDue] = useState('')
  const [editTime, setEditTime] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const getRandomEmoji = () => {
    return RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)]
  }

  const handleAddTask = () => {
    if (input.trim() === '') return
    setTasks([...tasks, { text: input, description: desc, due: due, time: time, completed: false, emoji: getRandomEmoji() }])
    setInput('')
    setDesc('')
    setDue(getTodayDate())
    setTime(getNowTime())
  }

  const handleToggle = idx => {
    setTasks(tasks => tasks.map((task, i) => i === idx ? { ...task, completed: !task.completed } : task))
  }

  const handleDelete = idx => {
    setTasks(tasks => tasks.filter((_, i) => i !== idx))
  }

  const handleInputKeyDown = e => {
    if (e.key === 'Enter') handleAddTask()
  }

  const handleEdit = idx => {
    setEditIdx(idx)
    setEditValue(tasks[idx].text)
    setEditDesc(tasks[idx].description || '')
    setEditDue(tasks[idx].due || getTodayDate())
    setEditTime(tasks[idx].time || getNowTime())
  }

  const handleEditChange = e => {
    setEditValue(e.target.value)
  }

  const handleEditDescChange = e => {
    setEditDesc(e.target.value)
  }

  const handleEditDueChange = e => {
    setEditDue(e.target.value)
  }

  const handleEditTimeChange = e => {
    setEditTime(e.target.value)
  }

  const handleEditSave = idx => {
    if (editValue.trim() === '') return
    setTasks(tasks => tasks.map((task, i) => i === idx ? { ...task, text: editValue, description: editDesc, due: editDue, time: editTime } : task))
    setEditIdx(null)
    setEditValue('')
    setEditDesc('')
    setEditDue('')
    setEditTime('')
  }

  const handleEditKeyDown = (e, idx) => {
    if (e.key === 'Enter') handleEditSave(idx)
    if (e.key === 'Escape') {
      setEditIdx(null)
      setEditValue('')
      setEditDesc('')
      setEditDue('')
      setEditTime('')
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const completedCount = tasks.filter(t => t.completed).length
  const pendingCount = tasks.length - completedCount
  const percent = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100)

  return (
    <div className="site-wrapper">
     
      <div className="glassy-container" style={{ position: 'relative' }}>
        <div className="liquid-glass-bg" />
        <CircularCounter completed={completedCount} total={tasks.length} percent={percent} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', position: 'relative', zIndex: 2, width: '100%', maxWidth: 600 }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>To-Do List</h1>
          <button
            onClick={toggleTheme}
            className="glassy-btn"
            style={{
              borderRadius: '50%',
              width: 40,
              height: 40,
              fontSize: '1.3em',
              padding: 0,
              margin: 0,
              minWidth: 0,
              minHeight: 0
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
        <form className="add-form" onSubmit={e => { e.preventDefault(); handleAddTask() }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Add a new task..."
            className="glassy-input"
          />
          <input
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Description (optional)"
            className="glassy-input"
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="date"
              value={due}
              onChange={e => setDue(e.target.value)}
              className="glassy-input"
              style={{ flex: 1 }}
            />
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="glassy-input"
              style={{ flex: 1 }}
            />
          </div>
          <button type="submit" className="glassy-btn">
            Add
          </button>
        </form>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', position: 'relative', zIndex: 2, width: '100%', maxWidth: 600 }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setFilter('all')} className="glassy-btn" style={{ border: filter==='all' ? '2px solid #646cff' : undefined, background: filter==='all' ? 'rgba(100,108,255,0.08)' : undefined }}>All</button>
            <button onClick={() => setFilter('completed')} className="glassy-btn" style={{ border: filter==='completed' ? '2px solid #646cff' : undefined, background: filter==='completed' ? 'rgba(100,108,255,0.08)' : undefined }}>Completed</button>
            <button onClick={() => setFilter('pending')} className="glassy-btn" style={{ border: filter==='pending' ? '2px solid #646cff' : undefined, background: filter==='pending' ? 'rgba(100,108,255,0.08)' : undefined }}>Pending</button>
          </div>
        </div>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          position: 'relative',
          zIndex: 2,
          width: '509px',
          maxWidth: '509px',
          minHeight: '180px',
          height: filteredTasks.length === 0 ? '180px' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: filteredTasks.length === 0 ? 'center' : 'flex-start',
          alignItems: 'center'
        }}>
          {filteredTasks.length === 0 ? (
            <li style={{ color: '#888', fontSize: '1.2em', textAlign: 'center', opacity: 0.7 }}>
              No tasks yet! Add your first task above.
            </li>
          ) : (
            filteredTasks.map((task, idx) => {
              const realIdx = tasks.indexOf(task)
              return (
                <TaskItem
                  key={realIdx}
                  task={{ ...task, realIdx }}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  editMode={editIdx === realIdx}
                  editValues={{ value: editValue, desc: editDesc, due: editDue, time: editTime }}
                  editHandlers={{
                    onChange: handleEditChange,
                    onDescChange: handleEditDescChange,
                    onDueChange: handleEditDueChange,
                    onTimeChange: handleEditTimeChange,
                    onImgChange: () => {},
                    onImgUrlChange: () => {},
                    onSave: handleEditSave,
                    onKeyDown: handleEditKeyDown,
                    fileInputRef: { current: null }
                  }}
                  getDayOfWeek={getDayOfWeek}
                />
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
