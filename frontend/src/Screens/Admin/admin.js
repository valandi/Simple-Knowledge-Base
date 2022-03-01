import { useEffect, useState } from "react";
import ManageCategories from "../../Components/ManageCategories/manageCategories";
import ManageTags from "../../Components/ManageTags/manageTags";
import { useSelector, useDispatch } from "react-redux";
import {
    addCategory,
    deleteCategory,
    editCategory,
    fetchCategories,
} from '../../Redux/categoriesSlice';
import { 
    fetchTags,
    addTag,
    editTag,
    deleteTag
} from "../../Redux/tagsSlice";
import "./admin.css"

function Admin() {
    const [currentTab, setCurrentTab] = useState("tags");
    const categories = useSelector((state) => state.categories.values)
    const tags = useSelector((state) => state.tags.values)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTags());
    }, [])

    const handleAddCategory = async (category) => {
        await dispatch(addCategory(category))
    }

    const handleDeleteCategory = async (id, index) => {
        await dispatch(deleteCategory({id, index}));
    }

    const handleEditCategory = async (category, index) => {
        await dispatch(editCategory({category, index}));
    }

    const handleAddTag = async (tag) => {
        await dispatch(addTag(tag))
    }

    const handleDeleteTag = async (id, index) => {
        await dispatch(deleteTag({id, index}));
    }

    const handleEditTag = async (tag, index) => {
        await dispatch(editTag({tag, index}));
    }

    return (
        
        <div className="admin-container">
            <div className="admin-subnav">
                <button className={currentTab == 'tags' ? "selected" : ""} onClick={() => setCurrentTab('tags')}>Manage Tags</button>
                <button className={currentTab == 'categories' ? "selected" : ""}onClick={() => setCurrentTab('categories')}>Manage Categories</button>
            </div>
            {currentTab == 'tags' && (
                <ManageTags
                    tags={tags}
                    addTag={handleAddTag}
                    deleteTag={handleDeleteTag}
                    editTag={handleEditTag}
                ></ManageTags>
            )}
            {currentTab == 'categories' && (
                <ManageCategories
                    categories={categories}
                    addCategory={handleAddCategory}
                    deleteCategory={handleDeleteCategory}
                    editCategory={handleEditCategory}
                ></ManageCategories>
            )}
        </div>
    );
}

export default Admin;