// 2) get at least 3-7 images (make sure to count and tell the user)
// 3) display each image to the user and match the word he entered to the word
//    used to get the image
let count = 0;
let image_names = ["angry","cloud","ear","laught","tropical","knowlage","gun_shooting","wisdom_journy"];
const imageFolder = "../images";
let image = new Image();

// with each Request get 3-5 pics
function get_image() {
    count = count % image_names.length;
    image.src = imageFolder + "/" + image_names[count] + ".jpg";
    image.className = "respImg";
    count++;
    return image;
}

export {get_image};