import Image from "next/image.js";
import React, { useState } from "react";
import { StyledMain, ImageContainer, Form, StyledButton } from "./style";
import { useSession } from "next-auth/react";

export default function Upload({ spotId, initialImage }) {
  const { data: session } = useSession();
  const [image, setImage] = useState(initialImage);
  const [error, setError] = useState(null);

  async function submitImage(event) {
    event.preventDefault();

    if (!session) {
      setError(new Error("LOGIN TO UPLOAD AN IMAGE."));
      return;
    }

    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/upload", {
        method: "post",
        body: formData,
      });
      const img = await response.json();



      const updateResponse = await fetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: img.url }),
      });

      if (!updateResponse.ok) {
        throw new Error("ERROR UPDATING THE SPOT WITH THE IMAGE URL.");
      }

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
            src={image.url || image}
            alt="Uploaded image"
            priority
            layout="responsive"
            height={image.height || 500}
            width={image.width || 500}
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
