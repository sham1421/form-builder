// src/FormPreview.jsx
import React from 'react';

export default function FormPreview({
  fields,
  onSelect,
  onDelete,
}) {
  return (
    <form className="preview-form">
      {fields.map((f) => (
        <div key={f.id} className="preview-field" onClick={() => onSelect(f.id)}>
          <label>{f.label}{f.required && '*'}</label>

          {f.type === 'select' ? (
            <select name={f.name}>
              {f.options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          ) : f.type === 'textarea' ? (
            <textarea name={f.name} placeholder={f.placeholder} />
          ) : (
            <input type={f.type} name={f.name} placeholder={f.placeholder} />
          )}

          <button
            type="button"
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(f.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </form>
  );
}
