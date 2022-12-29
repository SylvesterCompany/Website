export default async function getJSONFrom(url) {
    const response = await fetch(url);
    return await response.json();
}