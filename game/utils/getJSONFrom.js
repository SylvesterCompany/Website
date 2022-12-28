export default async function getJSONFrom(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}