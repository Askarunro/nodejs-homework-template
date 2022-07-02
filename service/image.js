const fs = require("fs");
const Jimp = require("jimp");
const path = require("path");
const { PUBLIC_DIR, AVATARS } = require("../helpers/consts");

function remove(){
    // continue
    fs.unlink(file);
}

const uploadImage = async (id, file) => {
    console.log(file)
  const avatarURL = path.join(AVATARS, `${id}${path.extname(file.originalname)}`);
  try {
    await Jimp.read(file.path).then((image) => {
      image.resize(250, 250, (err, image) => {
        image.write(path.join(PUBLIC_DIR, avatarURL));
      });
    });
    return avatarURL;
  } catch (e) {
    throw e;
  } finally {
    remove()
  }
};

module.exports = {
  uploadImage,
};
