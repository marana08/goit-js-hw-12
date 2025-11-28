import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "53360876-f97dd2c70b0e27b498deb3edc";

export async function getImagesByQuery(query, page) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: 15, 
    };

    const { data } = await axios.get(BASE_URL, { params });
    return data;
}


