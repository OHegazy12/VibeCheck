import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import postImg from "../../assets/logo.png";
import { GET, POSTFORMDATA } from "../../constant/constant";
import { ProfileAction } from "../ProfileContext";

export const HomeContext = createContext();
export const HomeAction = createContext();

function HomeContextProvider({ children }) {
  const { getProfilePost } = useContext(ProfileAction);
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

  // const result = useCallback(async (files) => {
  //   try {
  //     const response = await POSTFORMDATA("createPost", files);
  //     const data = await response.json();
  //     console.log(" Get Post data => ", data);
  //   } catch (error) {
  //     console.error("Encounter Error => ", error);
  //   }
  // });
  // console.log("Cookie", document.cookie);
  const createPost = (topic, title, body_text, image, handleDisableBTN) => {
    // type, topic, title, body_text

    // console.log({ topic, title, body_text, image });

    const files = new FormData();
    files.append("image", image || "no image");
    files.append("topic", topic);
    files.append("title", title);
    files.append("body_text", body_text);
    files.append("type", "friends");
    files.append("is_event", true);
    files.append("likes_criteria", 1);
    files.append("event_prize", "https://imgur.com/a/VUmsAto");

    //  is_event, likes_criteria, event_prize

    POSTFORMDATA("createPost", files)
      .then((res) => {
        // const response = res.json();
        console.log("response => ", res);
        getProfilePost();
        alert(res);
        handleDisableBTN(false);
      })
      .catch((error) => {
        console.error("Encounter Error => ", error);
        handleDisableBTN(false);
      });
    //console.log("result => ", result);
    // result(files);
  };

  // const fetchUserPosts = useCallback(async () => {
  //   console.log("hello WOrld");
  //   try {
  //     const response = await fetch("http://localhost:3001/api/profile/", {
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     console.log(" Get Post data => ", data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });

  const getHomePost = async () => {
    // Data should be call here from the data base
    await GET("communityFeed")
      .then((res) => {
        const HomePostData =
          res?.length > 0
            ? res?.map((data) => {
                return {
                  // name: `${user?.first_name} ${user?.last_name}`,
                  // avatar: user?.profile_picture,
                  location: data.type,
                  title: data.title,
                  caption: data.body_text,
                  image: data.img_link,
                  _id: data.post_id,
                };
              })
            : [];

        setHomePost(HomePostData);
      })
      .catch((error) => console.error("enconter error getting post: ", error));

    // Replace this profile post with the data you receive
  };

  useEffect(() => {
    // fetchUserPosts();
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
