import { postApi } from "api/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "types/interfaces";

import "styles/Post.scss";

export const PostPage = () => {
  const { postID } = useParams();
  const [currentPost, setCurrentPost] = useState<Post>({});

  useEffect(() => {
    if (postID) {
      postApi.getPersonalPostById(postID).then((res) => {
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
          <h3 className="title-wrapper__title">{currentPost.title}</h3>
          <p className="title-wrapper__date">
            {currentPost.date
              ?.toString()
              .substring(0, currentPost.date.toString().indexOf("T"))}
          </p>
        </div>
        <div className="desc-wrapper">
          <p className="desc-wrapper__desc">{currentPost.description}</p>
        </div>
      </div>
      <div className="image-wrapper">
        <img
          src={currentPost.image_url}
          alt=""
          className="image-wrapper__image"
        />
      </div>
    </div>
  );
};
