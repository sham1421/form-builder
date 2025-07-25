// src/FormBuilder.jsx
import React, { useState } from 'react';
import FormPreview from './FormPreview';
import FieldEditor from './FieldEditor';
import { v4 as uuid } from 'uuid';

const fieldTypes = [
  { type: 'text', label: 'Text' },
  { type: 'email', label: 'Email' },
  { type: 'tel', label: 'Phone' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'select', label: 'Dropdown' },
];

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addField = (type) => {
    const newField = {
      id: uuid(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      name: `${type}_${uuid().split('-')[0]}`,
      options: type === 'select' ? ['Option 1', 'Option 2'] : [],
      required: false,
      placeholder: '',
    };
    setFields((f) => [...f, newField]);
  };

  const updateField = (updated) => {
    setFields((f) => f.map((fld) => (fld.id === updated.id ? updated : fld)));
  };

  const deleteField = (id) => {
    setFields((f) => f.filter((fld) => fld.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const selectedField = fields.find((f) => f.id === selectedId);

  return (
    <div className="builder-container">
      <aside className="sidebar">
        <h2>Add Field</h2>
        {fieldTypes.map((ft) => (
          <button key={ft.type} onClick={() => addField(ft.type)}>
            + {ft.label}
          </button>
        ))}
      </aside>

      <section className="canvas">
        <h2>Form Preview</h2>
        <FormPreview
          fields={fields}
          onSelect={(id) => setSelectedId(id)}
          onDelete={deleteField}
        />
      </section>

      <aside className="editor">
        <h2>{selectedField ? 'Edit Field' : 'Select a field'}</h2>
        {selectedField && (
          <FieldEditor field={selectedField} onSave={updateField} />
        )}
      </aside>
    </div>
  );
}
