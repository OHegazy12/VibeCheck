import React, { createContext, useEffect, useState } from "react";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import postImg from "../../assets/logo.png";
import { POST, POSTFORMDATA } from "../../constant/constant";

export const HomeContext = createContext();
export const HomeAction = createContext();

function HomeContextProvider({ children }) {
  const [homePost, setHomePost] = useState([]);
  const HomePost = [
    {
      name: "Steve Rogers",
      avatar: StevePicture,
      location: "London, UK",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Archie",
      avatar: RobertPicture,
      location: "Toronto,Canada",
      caption: "Amaizing view",
    },
    {
      name: "Melinda",
      avatar: RobertPicture,
      location: "Paris, France",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Marcus",
      avatar: RobertPicture,
      location: "London, UK",
      image: postImg,
    },
    {
      name: "Gary",
      avatar: RobertPicture,
      location: "Toronto,Canada",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Kevin",
      avatar: RobertPicture,
      location: "Paris, France",
    },
  ];

  // console.log("Cookie", document.cookie);
  const createPost = (topic, title, body_text, image) => {
    // type, topic, title, body_text

    console.log({ topic, title, body_text, image });

    const files = new FormData();
    files.append("image", image);
    files.append("topic", topic);
    files.append("title", title);
    files.append("body_text", body_text);
    files.append("type", "Music");

    POSTFORMDATA("createPost", files)
      .then((response) => {
        console.log("response => ", response);
        alert(response);
        // call get post method here
      })
      .catch((error) => console.error(error));
  };

  const getHomePost = () => {
    // Data should be call here from the data base

    setHomePost(HomePost);
    // Replace this profile post with the data you receive
  };

  useEffect(() => {
    getHomePost();
  }, []);

  return (
    <HomeContext.Provider value={{ homePost }}>
      <HomeAction.Provider value={{ createPost }}>
        {children}
      </HomeAction.Provider>
    </HomeContext.Provider>
  );
}

export default HomeContextProvider;
