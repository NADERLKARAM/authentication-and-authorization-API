const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Images allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);

// 1 - deskStorage engine

// const multerStorage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'uploads/categories');
//     },
//     filename: function(req, file, cb){
//         // category-${id}-date.now().jpeg
//         const ext = file.mimetype.split('/')[1];
//         const filename = `category-${uuid4()}-${Date.now()}.${ext}`;
//         cb(null, filename);
//     },
// });s
