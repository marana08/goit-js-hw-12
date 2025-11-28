import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

export const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
        .map(
            (img) => `
            <a class="gallery-item" href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
                <div class="info">
                    <p><b>Likes:</b> ${img.likes}</p>
                    <p><b>Views:</b> ${img.views}</p>
                    <p><b>Comments:</b> ${img.comments}</p>
                    <p><b>Downloads:</b> ${img.downloads}</p>
                </div>
            </a>`
        )
        .join("");

    galleryContainer.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();
}

export function clearGallery() {
    galleryContainer.innerHTML = "";
}

export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.add("hidden");
}

