import React from "react";
import {
  useParams
} from "react-router-dom";
import Post from "./Post"

export default function SharedPostContainer() {
  const { data } = useParams();

  // It would be a good idea to sanitize the data to prevent XSS attacks
  const parsedData = JSON.parse(decodeURIComponent(data))
  return (
    <Post
      imageUrl={parsedData.imageUrl}
      description=""
      title={parsedData.title}
      date={parsedData.date}
    />
  )
}
