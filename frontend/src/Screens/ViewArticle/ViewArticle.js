import { useState, useEffect } from "react";
import Editor from 'react-markdown-editor-lite';
import "./ViewArticle.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditArticle from "../../Components/EditArticle/editArticle";
import MarkdownViewer from "../../Components/MarkdownViewer/MarkdownViewer";
import {
    editArticle,
    getArticle,
    deleteArticle
} from '../../Redux/articlesSlice';
import {
    fetchCategories,
} from '../../Redux/categoriesSlice';
import { 
    fetchTags,
} from "../../Redux/tagsSlice";

function ViewArticle(props) {
    const [showEdit, setShowEdit] = useState(false);
    const [editingArticle, setEditingArticle] = useState({});
    const article = useSelector((state) => state.articles.viewingArticle);
    const categories = useSelector((state) => state.categories.values)
    const tags = useSelector((state) => state.tags.values)
    const dispatch = useDispatch()
    const params = useParams();
    const nav = useNavigate();

    const handleSaveEdits = async function() {
        dispatch(editArticle(editingArticle));
        setShowEdit(false);
    }

    const handleDelete = async function() {
        await dispatch(deleteArticle({id: article._id}));
        nav('/search'); 
    }

    useEffect(async () => {
        const id = params.id;
        dispatch(fetchCategories());
        dispatch(fetchTags());
        await dispatch(getArticle({id}));

    }, [])

    const handleShowEdit = async function() {
        setEditingArticle({...article});
        setShowEdit(true);
    }

    const handleArticleChange = async function(article) {
        setEditingArticle(article);
    }
    
    return (
        <div>
            {!showEdit && [
                <div className="view-article-header">
                    <div className="sub-header">
                        <div>
                            <button className="main-button" onClick={handleDelete}>Delete</button>
                            <button className="main-button" onClick={handleShowEdit}>Edit</button>
                        </div>
                        <div>
                            <h2>{article && article.title}</h2>
                        </div>
                        <div className="category">
                            <label>{article && article.category && article.category.name}</label>
                        </div>
                    </div>
                </div>,
                <div>
                    {article && article.tags && article.tags.length > 0 && (
                        <div className="tags">
                            {article.tags.map((tag) => {
                                return <span key={tag._id}>{tag.name} </span>
                            })}
                        </div>
                    )}
                </div>
            ]}

            {!showEdit && article && article.markdown && (<Editor
                value={article.markdown}
                view={{menu: false, md: false, html: true}}
                renderHTML={(text) => <MarkdownViewer markdown={text} />}
            />)}
            {showEdit && [
                <EditArticle
                    article={editingArticle}
                    categories={categories}
                    tags={tags}
                    onSave={handleSaveEdits}
                    onCancel={() => setShowEdit(false)}
                    onArticleChange={handleArticleChange}
                ></EditArticle>,
                // <button onClick={() => setShowEdit(false)}>Cancel Edit</button>
            ]}
        </div>
        
    )
}

export default ViewArticle;