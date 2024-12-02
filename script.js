// Hàm chờ trong vài giây
const wait = function (seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

let currentImg; // Biến toàn cục để lưu trữ hình ảnh hiện tại

// Hàm tạo hình ảnh với Promise
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", () => {
      document.querySelector(".image").appendChild(img);
      resolve(img); // Trả về phần tử ảnh sau khi tải xong
    });

    img.addEventListener("error", () => {
      reject(new Error("Image failed to load"));
    });
  });
};

// Chuỗi thực thi
createImage("img/download.png")
  .then((img) => {
    currentImg = img; // Lưu trữ hình ảnh hiện tại
    console.log("First image loaded");
    return wait(2); // Chờ 2 giây
  })
  .then(() => {
    currentImg.style.display = "none"; // Ẩn hình ảnh hiện tại
    return createImage("img/11.png"); // Tải hình ảnh thứ hai
  })
  .then((img) => {
    currentImg = img; // Lưu trữ hình ảnh hiện tại
    console.log("Second image loaded");
    return wait(2); // Chờ 2 giây
  })
  .then(() => {
    currentImg.style.display = "none"; // Ẩn hình ảnh hiện tại
    console.log("All images are hidden");
  })
  .catch((err) => console.error(err.message)); // Xử lý lỗi
