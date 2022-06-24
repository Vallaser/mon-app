import { useState } from "react";
import {storage} from "./firebase-config.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Container, Grid, Image, Item, Button } from "semantic-ui-react";

//import { storage } from "./firebase";

function App() {
  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };


  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const imageRef = ref(storage, `8440.jpg`);
  
  getDownloadURL(imageRef)
    .then((url) => {
      setUrl(url);
    })
        

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log("test")
    /*uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );*/
  };

  return (
    <div className="App">
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <hr />
      <h2>Uploading done uiii {progress}%</h2>
      <img src={url} ></img>
    </div>
  );
}

export default App;
