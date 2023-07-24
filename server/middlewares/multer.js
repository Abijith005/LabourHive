import multer from "multer"
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    console.log(file, 'fdghjhdjsjjjhsjhjhjhs');
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    console.log(file, 'fhghghggjhgkjhj');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
  }
})

const upload = multer({ storage: storage })
const singleUpload = upload.fields([{ name: 'vectorImage', maxCount: 1 }])
export default singleUpload


