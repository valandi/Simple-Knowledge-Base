import { useState } from "react";

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
        <div>
            <input value={newCategoryName} placeholder="Create New Category" onChange={(e) => setNewCategory(e.target.value)}/>
            <button onClick={handleSave}>Save New Category</button>
            {props.categories && props.categories.map((category, index) => {
                return (
                    <div key={category._id}>
                        {index != editingIndex && <p>{category.name}</p>}
                        {index == editingIndex && (
                            <div>
                                <input value={editingValue} onChange={(e) => setEditingValue(e.target.value)}/>
                                <button onClick={handleSaveEdits}>Save Edits</button>
                                <button onClick={() => {setEditingIndex(undefined); setEditingValue(undefined)}}>Cancel</button>
                            </div>
                        )}
                        {index != editingIndex && <button onClick={() => handleEditClick(category.name, index)}>Edit</button>}
                        {index != editingIndex && <button onClick={() => handleDelete(category._id, index)}>Delete</button>}
                    </div>
                )
            })}
        </div>
    );
}

export default ManageCategories;