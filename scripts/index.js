// Adapted from: https://github.com/justadudewhohacks/tfjs-image-recognition-base/blob/master/src/dom/bufferToImage.ts
// (for use in browser, only)
function blobToImage(buf) {
    return new Promise((resolve, reject) => {
        if (!(buf instanceof Blob)) {
          return reject('bufferToImage - expected buf to be of type: Blob')
        }
    
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result !== 'string') {
            return reject('bufferToImage - expected reader.result to be a string, in onload')
          }
    
          const img = document.createElement('img');
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = reader.result;
        }
        reader.onerror = reject;
        reader.readAsDataURL(buf);
    });    
}

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const imageURL = 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png';
// const imageURL = 'https://images.metmuseum.org/CRDImages/rl/original/DP121332.jpg';
fetch(proxyurl + imageURL)
// fetch(imageURL)
        .then(r => r.blob())
        .then(blobToImage)
        .then(i => document.body.appendChild(i));