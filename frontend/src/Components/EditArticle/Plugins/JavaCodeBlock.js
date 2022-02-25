
import * as React from 'react';

const JavaCodeBlock = props => {
  
  const handleClick = () => {
    props.editor.insertText("~~~java\n\n~~~");
  }

  return (
    <span
      className="button button-type-counter"
      title="Counter"
      onClick={handleClick}
    >
      Java
    </span>
  );
}

JavaCodeBlock.defaultConfig = {
}
JavaCodeBlock.align = 'left';
JavaCodeBlock.pluginName = 'js-code-block';

export default JavaCodeBlock;