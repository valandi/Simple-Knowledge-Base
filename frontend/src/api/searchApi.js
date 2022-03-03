export async function generalSearchAsync(body) {
    const req = await fetch('http://localhost:5005/api/search', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    const res = await req.json();
    return res;
}