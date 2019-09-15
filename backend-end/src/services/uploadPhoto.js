import { format } from 'util'
import { Storage } from '@google-cloud/storage'

const storage = new Storage({
    projectId: "backend-apollo",
    keyFilename: "src/services/backend-apollo-firebase-adminsdk-4mda0-ade92c8c03.json",
});

const bucket = storage.bucket("gs://backend-apollo.appspot.com/");

const uploadImageToStorage = (buffer, contentType) => {
    return new Promise((resolve, reject) => {
        if (!buffer) {
            reject('No image file');
        }
        let newFileName = `${Date.now().valueOf().toString()}-${Math.random()}`;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType
            }
        });

        blobStream.on('error', (error) => {
            console.log(error)
            reject('Something is wrong! Unable to upload at the moment.');
        });


        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://firebasestorage.googleapis.com/v0/b/backend-apollo.appspot.com/o/${fileUpload.name}?alt=media`);
            return resolve(url);
        });

        blobStream.end(buffer);
    });
}

const uploadPhoto = async (base64String) => {
    const [contentType, data] = base64String.split(',');
    const buffer = Buffer.from(data, 'base64');
    return await uploadImageToStorage(buffer, contentType.split(':')[1].split(';')[0])
}

export default {
    uploadPhoto
}
