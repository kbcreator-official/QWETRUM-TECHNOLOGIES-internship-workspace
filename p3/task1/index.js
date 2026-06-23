let count = 1;

function increase() {
    count++;
    document.getElementById("count").textContent = count;
}

function decrease() {
    if (count > 1) {
        count--;
        document.getElementById("count").textContent = count;
    }
}

/* Navbar Active Link */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

/* Product Slider */

const products = [
    {
        image: "airpods.jpg",
        bgColor: "#ffd9c8"
    },
    {
        image: "headphones.webp",
        bgColor: "#ffd6e7"
    },
    {
        image: "phone.jpg",
        bgColor: "#e0dbff"
    },
    {
        image: "watch.jpg",
        bgColor: "#d9eeff"
    }
];

const mainProduct = document.getElementById("mainProduct");
const thumbs = document.querySelectorAll(".thumb");

let currentIndex = 0;

/* Update Product */

function updateProduct(index) {

    mainProduct.style.opacity = "0";
    mainProduct.style.transform = "translateX(-50%) scale(0.9)";

    setTimeout(() => {

        mainProduct.src = products[index].image;

        document.body.style.background =
            products[index].bgColor;

        mainProduct.style.opacity = "1";
        mainProduct.style.transform =
            "translateX(-50%) scale(1)";

        thumbs.forEach(item => {
            item.classList.remove("active-thumb");
        });

        thumbs[index].classList.add("active-thumb");

    }, 300);
}

/* Auto Change Every 5 Seconds */

function nextProduct() {

    currentIndex++;

    if (currentIndex >= products.length) {
        currentIndex = 0;
    }

    updateProduct(currentIndex);
}

setInterval(nextProduct, 5000);

/* Thumbnail Click */

thumbs.forEach((thumb, index) => {

    thumb.addEventListener("click", () => {

        currentIndex = index;

        updateProduct(currentIndex);

    });

});