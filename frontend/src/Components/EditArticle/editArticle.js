import Editor, { Plugins } from 'react-markdown-editor-lite';
import "./editArticle.css";
import 'react-markdown-editor-lite/lib/index.css';
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
            <div className='edit-title-container'>
                <input value={props.article.title} type="text" placeholder="Title" onChange={(e) => handleChange(e.target.value, 'title')}/>
            </div>
            <div className='edit-category-container'>
                <SingleValueSelector
                    options={props.categories}
                    label="Select Category"
                    displayField="name"
                    onValueChange={(category) => handleChange(category, 'category')}
                    initialValue={props.article.category}
                ></SingleValueSelector>
            </div>
            <div className='edit-tags-container'>
                <MultiValueSelector
                    options={props.tags}
                    label="Select Tags"
                    displayField="name"
                    initialValue={props.article.tags}
                    onValueChange={(tags) => handleChange(tags, 'tags')}
                ></MultiValueSelector>
            </div>
            
            <Editor
                value={props.article.markdown}
                style={{ height: '500px' }}
                onChange={({html, text}) => handleChange(text, 'markdown')} 
                renderHTML={(text) => <MarkdownViewer markdown={text} />}
            />
            <div style={{marginTop: "20px", textAlign: "center"}}>
                {props.onCancel && <button className="secondary-button" onClick={props.onCancel}>Cancel</button>  }
                <button className="main-button" onClick={() => onSave()}>Save</button>  
            </div>
            
        </div>
    );
}

export default EditArticle;