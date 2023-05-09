import React, { useContext } from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import Post from "../../components/Post";

import CreatePost from "../../components/CreatePost";
import { HomeContext } from "../../context/HomeContext";

function Home() {
  const { homePost } = useContext(HomeContext);
  return (
    <div className="HomeContainer">
      <MuiAppBar />
      <div className="HomeSection">
        <div className="HomeScreen">
          <CreatePost />
          {homePost?.length > 0 &&
            homePost?.map((data) => {
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
