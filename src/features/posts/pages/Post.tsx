import { getPersonalPostById } from "api/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "types/interfaces";

import "styles/Post.scss";

export const PostPage = () => {
  const { postID } = useParams();
  const [currentPost, setCurrentPost] = useState<Post>({});

  useEffect(() => {
    if (postID) {
      getPersonalPostById(postID).then((res) => {
        if (res?.status === 200) {
          setCurrentPost(res.data);
        }
      });
    }
  }, [postID]);

  return (
    <div className="post">
      <div className="text-wrapper">
        <div className="title-wrapper">
          <h3 className="title">{currentPost.title}</h3>
          <p className="date">
            {currentPost.date
              ?.toString()
              .substring(0, currentPost.date.toString().indexOf("T"))}
          </p>
        </div>
        <div className="desc-wrapper">
          <p>{currentPost.description}</p>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={currentPost.image_url} alt="" />
      </div>
    </div>
  );
};
