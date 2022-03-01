import { useState } from "react";
import "../ManageTags/manageTags.css";

function ManageCategories(props) {
    const [newCategoryName, setNewCategory] = useState("");
    const [editingIndex, setEditingIndex] = useState();
    const [editingValue, setEditingValue] = useState();

    const handleSave = async function() {
        const category = {
            name: newCategoryName
        }
        await props.addCategory(category);
        setNewCategory("");
    }

    const handleEditClick = function(name, index) {
        setEditingIndex(index);
        setEditingValue(name);
    }

    const handleSaveEdits = async function() {
        if (editingValue == props.categories[editingIndex].name) return;

        const category = {...props.categories[editingIndex]};
        category['name'] = editingValue; 

        await props.editCategory(category, editingIndex);
        setEditingIndex(undefined);
        setEditingValue(undefined);
    }

    const handleDelete = async function(id, index) {
        await props.deleteCategory(id, index);
    }

    return (
        <div className="manage-items-container">
            <input className="create-new" value={newCategoryName} placeholder="Create New Category" onChange={(e) => setNewCategory(e.target.value)}/>
            <button className="main-button" onClick={handleSave}>Save</button>
            <div className="options-container">
                {props.categories && props.categories.map((category, index) => {
                    return (
                        <div key={category._id} className="option">
                            {index != editingIndex && <label>{category.name}</label>}
                            {index == editingIndex && (
                                <div>
                                    <input value={editingValue} onChange={(e) => setEditingValue(e.target.value)}/>
                                    <button onClick={handleSaveEdits}>Save Edits</button>
                                    <button onClick={() => {setEditingIndex(undefined); setEditingValue(undefined)}}>Cancel</button>
                                </div>
                            )}
                            <div>
                                {index != editingIndex && <button onClick={() => handleEditClick(category.name, index)}>Edit</button>}
                                {index != editingIndex && <button onClick={() => handleDelete(category._id, index)}>Delete</button>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ManageCategories;