const API_KEY = "ca370d51a054836007519a00ff4ce59e";

const imglist_Url =
    `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=10&format=json&nojsoncallback=1`;

async function getimg() {
    const gal = document.getElementById("gallery");
    gal.innerHTML = "";

    try {
        const res = await fetch(imglist_Url, { method: "GET" });

        if (!res.ok) {
            throw new Error("Get image list failed: " + res.statusText);
        }

        const data = await res.json();
        console.log("recent list =", data);

        const photos = data.photos.photo.slice(0, 5);

        for (const item of photos) {
            const imgUrl = await getPhotoUrlById(item.id);
            if (imgUrl) {
                add_new_img(imgUrl);
            }
        }
    } catch (error) {
        console.error(error);
        alert("載入 Flickr 圖片失敗");
    }
}

async function getPhotoUrlById(photoId) {
    const img_Url =
        `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;

    try {
        const res = await fetch(img_Url, { method: "GET" });

        if (!res.ok) {
            throw new Error("Get image size failed: " + res.statusText);
        }

        const data = await res.json();
        console.log("sizes =", data);

        const sizes = data.sizes.size;

        // 優先找較適合展示的尺寸
        let target =
            sizes.find(item => item.label === "Medium") ||
            sizes.find(item => item.label === "Large") ||
            sizes.find(item => item.label === "Small") ||
            sizes[sizes.length - 1];

        return target.source;
    } catch (error) {
        console.error("photo id =", photoId, error);
        return null;
    }
}

function add_new_img(imgSrc) {
    const gal = document.getElementById("gallery");
    const img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    gal.appendChild(img);
}