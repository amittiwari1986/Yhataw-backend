const express = require("express")
const Routes = express.Router()
const userController = require("../controller/userController")
const uploadController = require("../controller/uploadController")
const multer = require("multer");
const multerS3 = require("multer-s3");
const uploadfile = multer({ dest: 'team-document/' });
const aws = require("aws-sdk");
const { S3Client } = require('@aws-sdk/client-s3');
const bodyParser = require("body-parser");
const shortId = require('shortid');
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin,verifyToken} = require("../utils/verifyToken")



// aws.config.update({
// 	secretAccessKey: 'pSD+OEcgsCzItA1bVzIuDICxg/bM+U1hps19638Q',
// 	accessKeyId: 'AKIAX2FIBN4ISHL3RGIQ',
// 	region: 'us-east-1'
// });

var app = express();
// var s3 = new aws.S3();

let s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIAX2FIBN4ISHL3RGIQ',
    secretAccessKey: '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',
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'team-document',
        contentType: multerS3.AUTO_CONTENT_TYPE,
         metadata: function (req, file, cb) {
	      cb(null, { fieldName: file.fieldname});
	    },
	    key: function (req, file, cb) {
	      cb(null, shortId.generate() + '-' + file.originalname);
	    },
    })
});

Routes.put("/updateUser/:id",verifyTokenAndAuthoreization,userController.updateUser)
Routes.delete("/deleteUser/:id",verifyTokenAndAuthoreization,userController.deleteUser)
Routes.get("/allUser",userController.fetchAllUser)
// Routes.get("/find/:id",verifyTokenAndAdmin,userController.getUserByIds)
Routes.get("/find/:id",verifyToken,userController.getUserByIds)

Routes.get("/findUserBank/:id",verifyTokenAndAuthoreization,userController.getUserBankByIds)
Routes.get("/findUserLeave/:id",verifyTokenAndAuthoreization,userController.getUserLeaveByIds)
Routes.get("/findUserOffice/:id",verifyTokenAndAuthoreization,userController.getUserOfficeByIds)
Routes.get("/getUserAllInfo/:id",verifyTokenAndAuthoreization,userController.getallUserByIds)
Routes.get("/findUserSalaryDeclaration/:id",verifyTokenAndAuthoreization,userController.getUserSalaryDeclarationByIds)
Routes.get("/findUserLoanDeclaration/:id",verifyTokenAndAuthoreization,userController.getUserLoanDeclarationByIds)
Routes.get("/findUserAttendance/:id",verifyToken,userController.getUserAttendanceByIds)
Routes.get("/findUserAttendance",verifyToken,userController.getUserAttendanceByIds)

Routes.get("/getUserApplyLeaveByIds/:id",verifyTokenAndAuthoreization,userController.getUserApplyLeaveByIds)
Routes.get("/getOrganizationByIds",userController.getOrganizationByIds)
// Routes.post("/upload-image",uploadController.uploadImage)

Routes.post('/upload-image',upload.single('file'), function (req, res, next) {     
	console.log(req.file.location);
	res.send({"imageUrl": req.file.location}); 
})

module.exports = Routes