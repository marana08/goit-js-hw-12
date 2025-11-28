import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton
} from "./js/render-functions";

const form = document.querySelector(".form");
const input = document.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
const PER_PAGE = 15;

// Події
form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

// =============================
//  Пошук
// =============================
async function onSearch(event) {
    event.preventDefault();

    query = input.value.trim();
    page = 1;

    if (!query) {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search query!",
            timeout: 2000,
        });
        return;
    }

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);

        if (!data.hits.length) {
            iziToast.error({
                title: "No results",
                message: "Sorry, no images match your search query.",
            });
            return;
        }

        createGallery(data.hits);

        if (data.totalHits <= PER_PAGE) {
            hideLoadMoreButton();
            iziToast.info({
                title: "End",
                message: "We're sorry, but you've reached the end of search results.",
            });
            // return;
        }

        showLoadMoreButton();

    } catch (error) {
        showError();
    } finally {
        hideLoader();
    }
}

// =============================
//  Завантаження додаткових зображень
// =============================
async function onLoadMore() {
    page++;
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);

        smoothScroll();

        // Кінець результатів
        if (page * PER_PAGE >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: "End",
                message:  "We're sorry, but you've reached the end of search results.",
            });
        }

    } catch (error) {
        showError();
    } finally {
        hideLoader();
    }
}

// =============================
//  Допоміжні функції
// =============================
function smoothScroll() {
    const firstCard = document
        .querySelector(".gallery")
        ?.firstElementChild;

    if (!firstCard) return;

    const cardHeight = firstCard.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function showError() {
    iziToast.error({
        title: "Error",
        message: "Something went wrong. Try again later.",
    });
}

