import React from 'react'

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  editMode,
  editValues,
  editHandlers,
  getDayOfWeek
}) {
  const realIdx = task.realIdx
  return (
    <li className="glassy-task" style={{ position: 'relative' }}>
      <div className="liquid-glass-bg" />
      <span style={{ fontSize: '2.1em', marginRight: '0.7em', verticalAlign: 'middle', zIndex: 2, position: 'relative' }}>{task.emoji}</span>
      <label style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer', position: 'relative', zIndex: 2 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(realIdx)}
          style={{ marginRight: '1rem', accentColor: '#646cff', width: 20, height: 20 }}
        />
        <div style={{ flex: 1 }}>
          {editMode ? (
            <>
              <input
                type="text"
                value={editValues.value}
                onChange={editHandlers.onChange}
                onBlur={() => editHandlers.onSave(realIdx)}
                onKeyDown={e => editHandlers.onKeyDown(e, realIdx)}
                autoFocus
                className="glassy-input"
                style={{ width: '100%', marginBottom: '0.3rem' }}
              />
              <input
                type="text"
                value={editValues.desc}
                onChange={editHandlers.onDescChange}
                onBlur={() => editHandlers.onSave(realIdx)}
                onKeyDown={e => editHandlers.onKeyDown(e, realIdx)}
                placeholder="Description"
                className="glassy-input"
                style={{ width: '100%', marginBottom: '0.3rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="date"
                  value={editValues.due}
                  onChange={editHandlers.onDueChange}
                  onBlur={() => editHandlers.onSave(realIdx)}
                  onKeyDown={e => editHandlers.onKeyDown(e, realIdx)}
                  className="glassy-input"
                  style={{ flex: 1, marginBottom: '0.3rem' }}
                />
                <input
                  type="time"
                  value={editValues.time}
                  onChange={editHandlers.onTimeChange}
                  onBlur={() => editHandlers.onSave(realIdx)}
                  onKeyDown={e => editHandlers.onKeyDown(e, realIdx)}
                  className="glassy-input"
                  style={{ flex: 1, marginBottom: '0.3rem' }}
                />
              </div>
            </>
          ) : (
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => onEdit(realIdx)}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.5 : 1, fontWeight: 600 }}>{task.text}</span>
              {task.description && <div style={{ fontSize: '0.95em', color: '#555', marginTop: '0.1em' }}>{task.description}</div>}
              {(task.due || task.time) && (
                <div style={{ fontSize: '0.9em', color: '#888', marginTop: '0.1em', display: 'flex', gap: '0.7em', alignItems: 'center' }}>
                  {task.due && <span>Due: {task.due} <span style={{ color: '#646cff', fontWeight: 600 }}>({getDayOfWeek(task.due)})</span></span>}
                  {task.time && <span>at {task.time}</span>}
                </div>
              )}
            </div>
          )}
        </div>
      </label>
      <button onClick={() => onDelete(realIdx)} className="glassy-btn" style={{ marginLeft: '1rem', background: 'rgba(255,0,0,0.08)', color: '#d00', fontWeight: 700, fontSize: '1.1em', padding: '0.3em 0.7em', minWidth: 0, minHeight: 0, position: 'relative', zIndex: 2 }} title="Delete">
        ×
      </button>
    </li>
  )
} 