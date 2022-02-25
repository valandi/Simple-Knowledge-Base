import * as React from 'react';
import './CodeBlockDropdown.css';

const CodeBlockDropdown = props => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  const handleClick = () => {
    // props.editor.insertText("~~~\n\n~~~");
    let curr = showDropdown;
    setShowDropdown(!curr);
  }

  const handleCodeSelect = (markdown) => {
    props.editor.insertText(markdown);
    setShowDropdown(false);
  }


  return (
    <div className="codeblock">
      <span
      className="button button-type-counter"
      title="Counter"
      onClick={handleClick}
    >
      Code
    </span>
    {showDropdown && (
      <div className="codeblock-dropdown-container">
        <p onClick={() => handleCodeSelect("~~~js\n\n~~~")}>JS</p>
        <p>Java</p>
        <p>Python</p>
        <p>C#</p>
      </div>
    )}
    </div>
    
  );
}

CodeBlockDropdown.defaultConfig = {
}
CodeBlockDropdown.align = 'left';
CodeBlockDropdown.pluginName = 'code-block-dropdown';

export default CodeBlockDropdown;