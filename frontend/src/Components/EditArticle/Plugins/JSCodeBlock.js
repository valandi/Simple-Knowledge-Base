
import * as React from 'react';

const JSCodeBlock = props => {
  
  const handleClick = () => {
    props.editor.insertText("~~~js\n\n~~~");
  }

  return (
    <span
      className="button button-type-counter"
      title="Counter"
      onClick={handleClick}
    >
      JS
    </span>
  );
}

JSCodeBlock.defaultConfig = {
}
JSCodeBlock.align = 'left';
JSCodeBlock.pluginName = 'js-code-block';

export default JSCodeBlock;