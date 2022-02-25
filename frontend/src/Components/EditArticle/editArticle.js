import Editor, { Plugins } from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import React, { useState, useEffect } from 'react';
import CodeBlockDropdown from './Plugins/CodeBlockDropdown';
import MarkdownViewer from '../MarkdownViewer/MarkdownViewer';
import SingleValueSelector from '../SingleValueSelector/singleValueSelector';
import MultiValueSelector from '../MultiValueSelector/multiValueSelector';

Editor.unuse(Plugins.FontUnderline);
Editor.unuse(Plugins.Clear);
Editor.unuse(Plugins.FontStrikethrough);
Editor.unuse(Plugins.BlockQuote);
Editor.unuse(Plugins.BlockCodeBlock);
Editor.unuse(Plugins.BlockCodeInline);
Editor.unuse(Plugins.Image);
Editor.use(CodeBlockDropdown, {});


function EditArticle(props) {

    const onSave = async function() {
        await props.onSave();
        props.onArticleChange({});
    }

    const handleChange = function(value, key) {
        let temp = {...props.article};
        temp[key] = value;
        props.onArticleChange(temp);
    }

    return (
        <div>
            <label>Title:</label>
            <input value={props.article.title} type="text" placeholder="title" onChange={(e) => handleChange(e.target.value, 'title')}/>
            <SingleValueSelector
                options={props.categories}
                label="Select Category"
                displayField="name"
                onValueChange={(category) => handleChange(category, 'category')}
                initialValue={props.article.category}
            ></SingleValueSelector>
            <MultiValueSelector
                options={props.tags}
                label="Select Tags"
                displayField="name"
                initialValue={props.article.tags}
                onValueChange={(tags) => handleChange(tags, 'tags')}
            ></MultiValueSelector>
            <Editor
                value={props.article.markdown}
                style={{ height: '500px' }}
                onChange={({html, text}) => handleChange(text, 'markdown')} 
                renderHTML={(text) => <MarkdownViewer markdown={text} />}
            />
            <button onClick={() => onSave()}>Save</button>
        </div>
    );
}

export default EditArticle;