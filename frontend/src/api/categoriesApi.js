export async function fetchCategoriesAsync() {
    const req = await fetch('http://localhost:5005/api/getCategories');
    const res = await req.json();
    return res;
}

export async function addCategoryAsync(category) {
    const req = await fetch('http://localhost:5005/api/saveCategory', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
    });
    const res = await req.json();
    if (res.error) throw res;
    return res;
}

export async function deleteCategoryAsync(id) {
    const req = await fetch('http://localhost:5005/api/deleteCategory/'+id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}

export async function editCategoryAsync(category) {
    const req = await fetch('http://localhost:5005/api/editCategory', {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
    });
}