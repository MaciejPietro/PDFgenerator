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
}) // Pass in opts to S3 if necessary

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
    function (err, data) {},
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

function getObject(Key) {
  return new Promise(async (resolve, reject) => {
    const getObjectCommand = new GetObjectCommand({ Bucket: bucketName, Key })

    try {
      const response = await client.send(getObjectCommand)
      let responseDataChunks = []
      response.Body.on('data', (chunk) => responseDataChunks.push(chunk))

      response.Body.once('end', () =>
        resolve(Buffer.concat(responseDataChunks).toString('base64')),
      )
    } catch (err) {
      return resolve('')
    }
  })
}
exports.getObject = getObject
