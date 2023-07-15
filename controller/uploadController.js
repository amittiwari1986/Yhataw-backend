const express = require("express");
const aws = require("aws-sdk");
const bodyParser = require("body-parser");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
	secretAccessKey: 'pSD+OEcgsCzItA1bVzIuDICxg/bM+U1hps19638Q',
	accessKeyId: 'AKIAX2FIBN4ISHL3RGIQ',
	region: 'us-east-1'
});

var app = express();
var s3 = new aws.S3();

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'team-document',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});




const uploadImage = async (req, res) => {



	console.log(req);
return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
	// upload.single('file')

};

	module.exports = { uploadImage }