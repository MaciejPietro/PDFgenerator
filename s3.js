require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
})

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

function deleteFile(key) {
  s3.deleteObject(
    {
      Bucket: bucketName,
      Key: key,
    },
    function (deleteErr, data) {
      if (deleteErr) {
        console.log('Error: ' + deleteErr)
      } else {
        console.log('Successfully deleted the item')
      }
    },
  )
}
exports.deleteFile = deleteFile

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

async function getObject(objectKey) {
  try {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    }

    const data = await s3.getObject(params).promise()

    return data.Body.toString('base64')
  } catch (e) {
    return ''
  }
}
exports.getObject = getObject
