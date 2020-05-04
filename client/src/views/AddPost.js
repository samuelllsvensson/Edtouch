import React, { useState } from "react";
import { CloudinaryContext } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../utils/CloudinaryService";

const AddPost = () => {
  const [images, setImages] = useState([]);

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "dhsmpulab",
      tags: [tag, "anImage"],
      uploadPreset: "ln6xughb",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          console.log("HEJ");
          setImages([...images, photos.info.public_id]);
        }
      } else {
        console.log(error);
      }
    });
  };

  return (
    <div className="container">
      {console.log(images)}
      <button onClick={() => beginUpload("image")}>Upload Image</button>
    </div>
  );
};

export default AddPost;
