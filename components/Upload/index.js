import Image from "next/image.js";
import React, { useState } from "react";
import { StyledMain, ImageContainer, Form } from "./style";


export default function Upload() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  async function submitImage(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/upload", {
        method: "post",
        body: formData,
      });
      const img = await response.json();

      console.log("Browser: response from API: ", img);

      setImage(img);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <StyledMain>
      {image && (
        <ImageContainer>
          <Image
            src={image.url}
            alt="Uploaded image"
            layout="responsive"
            height={image.height}
            width={image.width}
          />
        </ImageContainer>
      )}
      {error && <div>{error.message}</div>}
      <Form onSubmit={submitImage}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </Form>
    </StyledMain>
  );
}
