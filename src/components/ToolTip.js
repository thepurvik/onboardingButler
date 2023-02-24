import React from 'react';

const ToolTip = ({ children, toolTipText = '' }) => {
  return (
    <div className='customTooltip'>
      {children}
      <div className='customTooltip-text'>{toolTipText}</div>
    </div>
  );
};

export default ToolTip;
