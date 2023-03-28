import React from 'react';

const ModelSelector = ({ models, setCurrentModel }) => {
  return (
    <div className="models">
      <select
        onChange={(e) => {
          setCurrentModel(e.target.value);
        }}
      >
        {models.map((model, index) => (
          <option key={index} value={model.id}>
            {model.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
