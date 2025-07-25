// src/FieldEditor.jsx
import React, { useState, useEffect } from 'react';

export default function FieldEditor({ field, onSave }) {
  const [local, setLocal] = useState(field);

  useEffect(() => setLocal(field), [field]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocal((l) => ({
      ...l,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleOptions = (idx, value) => {
    const opts = [...local.options];
    opts[idx] = value;
    setLocal((l) => ({ ...l, options: opts }));
  };

  const addOption = () =>
    setLocal((l) => ({ ...l, options: [...l.options, ''] }));

  return (
    <div className="editor-form">
      <label>
        Label:
        <input name="label" value={local.label} onChange={handleChange} />
      </label>

      {local.type !== 'select' && (
        <label>
          Placeholder:
          <input
            name="placeholder"
            value={local.placeholder}
            onChange={handleChange}
          />
        </label>
      )}

      <label>
        Required:
        <input
          name="required"
          type="checkbox"
          checked={local.required}
          onChange={handleChange}
        />
      </label>

      {local.type === 'select' && (
        <>
          <p>Options:</p>
          {local.options.map((opt, idx) => (
            <input
              key={idx}
              value={opt}
              onChange={(e) => handleOptions(idx, e.target.value)}
            />
          ))}
          <button type="button" onClick={addOption}>
            + Add option
          </button>
        </>
      )}

      <button type="button" onClick={() => onSave(local)}>
        Save
      </button>
    </div>
  );
}
