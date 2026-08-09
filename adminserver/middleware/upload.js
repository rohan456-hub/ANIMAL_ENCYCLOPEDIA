const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Ensure folders exist
const createFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
};
const uploadFolders = ['uploads/images', 'uploads/audios', 'uploads/videos', 'uploads/gallery'];
uploadFolders.forEach(createFolder);

// Configure Multer Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, 'uploads/images');  // Image files
        } else if (file.mimetype.startsWith('audio/')) {
            cb(null, 'uploads/audios');  // Audio files
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, 'uploads/videos');  // Video files
        } else {
            cb(new Error('Unsupported file type'), false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File Filter
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype.startsWith('image/') ||
        file.mimetype.startsWith('audio/') ||
        file.mimetype.startsWith('video/')
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images, audio, and video are allowed.'));
    }
};

// Multer Upload Setup (Use `fields` Instead of `array`)
var upload = multer({ storage, fileFilter });

module.exports = upload;