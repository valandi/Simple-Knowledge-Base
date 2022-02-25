import EditArticle from "../../Components/EditArticle/editArticle";
import { useSelector, useDispatch } from "react-redux";
import {
    addArticle,
    updateNewArticle,
} from '../../Redux/articlesSlice';
import {
    fetchCategories,
} from '../../Redux/categoriesSlice';
import { 
    fetchTags,
} from "../../Redux/tagsSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function CreateArticle() {
    const dispatch = useDispatch();
    const newArticle = useSelector((state) => state.articles.newArticle);
    const categories = useSelector((state) => state.categories.values)
    const tags = useSelector((state) => state.tags.values)
    const nav = useNavigate();

    useEffect(async () => {
        dispatch(fetchCategories());
        dispatch(fetchTags());
    }, [])

    const handleSaveArticle = async function() {
        await dispatch(addArticle(newArticle));
        nav('/search');
    }

    const handleArticleChange = async function(article) {
        dispatch(updateNewArticle(article));
    }

    return (
        <div>
            <EditArticle
                article={newArticle}
                categories={categories}
                tags={tags}
                onSave={handleSaveArticle}
                onArticleChange={handleArticleChange}
            ></EditArticle>
        </div>
    )
}

export default CreateArticle;