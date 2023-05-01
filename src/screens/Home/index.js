import React from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import Post from "../../components/Post";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import postImg from "../../assets/logo.png";
import CreatePost from "../../components/CreatePost";

function Home() {
  const UserPost = [
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
  return (
    <div className="HomeContainer">
      <MuiAppBar />
      <div className="HomeSection">
        <div className="HomeScreen">
          <CreatePost />
          {UserPost.map((data) => {
            return (
              <Post
                userName={data.name}
                location={data.location}
                avatar={data.avatar}
                caption={data.caption}
                postImage={data.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
