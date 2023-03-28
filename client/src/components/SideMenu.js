import React from 'react';
import ModelSelector from './ModelSelector';

const SideMenu = ({ clearChat, models, setCurrentModel }) => {
  return (
    <aside className="side-menu">
      <div className="side-menu-btn" onClick={clearChat}>
        <span>+</span>
        New Chat
      </div>

      <ModelSelector models={models} setCurrentModel={setCurrentModel} />
    </aside>
  );
};

export default SideMenu;
