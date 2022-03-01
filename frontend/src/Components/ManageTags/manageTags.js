import { useState } from "react";
import "./manageTags.css"

function ManageTags(props) {
    const [newTagName, setNewTag] = useState("");
    const [editingIndex, setEditingIndex] = useState();
    const [editingValue, setEditingValue] = useState();

    const handleSave = async function() {
        const tag = {
            name: newTagName
        }
        await props.addTag(tag);
        setNewTag("");
    }

    const handleEditClick = function(name, index) {
        setEditingIndex(index);
        setEditingValue(name);
    }

    const handleSaveEdits = async function() {
        if (editingValue == props.tags[editingIndex].name) return;
        const tag = {...props.tags[editingIndex]};
        tag['name'] = editingValue; 
        await props.editTag(tag, editingIndex);
        setEditingIndex(undefined);
        setEditingValue(undefined);
    }

    const handleDelete = async function(id, index) {
        await props.deleteTag(id, index);
    }

    return (
        <div className="manage-items-container">
            <input className="create-new" value={newTagName} placeholder="Create New Tag" onChange={(e) => setNewTag(e.target.value)}/>
            <button className="main-button" onClick={handleSave}>Save</button>
            <div className="options-container">
                {props.tags && props.tags.map((tag, index) => {
                    return (
                        <div key={index} className="option">
                            {index != editingIndex && <label>{tag.name}</label>}
                            {index == editingIndex && (
                                <div>
                                    <input value={editingValue} onChange={(e) => setEditingValue(e.target.value)}/>
                                    <button onClick={handleSaveEdits}>Save Edits</button>
                                    <button onClick={() => {setEditingIndex(undefined); setEditingValue(undefined)}}>Cancel</button>
                                </div>
                            )}
                            <div>
                                {index != editingIndex && <button onClick={() => handleEditClick(tag.name, index)}>Edit</button>}
                                {index != editingIndex && <button onClick={() => handleDelete(tag._id, index)}>Delete</button>}
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ManageTags;