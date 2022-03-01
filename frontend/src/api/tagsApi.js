export async function fetchTagsAsync() {
    const req = await fetch('http://localhost:5005/api/getTags');
    const res = await req.json();
    return res;
}

export async function addTagAsync(tag) {
    const req = await fetch('http://localhost:5005/api/saveTag', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag),
    });
    const res = await req.json();
    if (res.error) throw res;
    return res;
}

export async function deleteTagAsync(id) {
    const req = await fetch('http://localhost:5005/api/deleteTag/'+id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const res = await req.json();
}

export async function editTagAsync(tag) {
    const req = await fetch('http://localhost:5005/api/editTag', {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag),
    });
    const res = await req.json();
}