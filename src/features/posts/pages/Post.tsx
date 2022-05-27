import { useParams } from "react-router-dom";
import { getDate } from "utils/getDate";
import { useQuery } from "react-query";
import { postApi } from "api/posts";
import { Loader } from "components/index";

import "styles/Post.scss";

export const PostPage = () => {
  const { postID } = useParams();
  const { data: currentPost, isLoading } = useQuery(
    "postDetails",
    async () => await postApi.getPersonalPostById(postID)
  );

  return (
    <Loader fade fixed height="100%" size="regular" loading={isLoading}>
      <div className="post">
        <div className="text-wrapper">
          <section className="title-wrapper">
            <h3 className="title-wrapper__title">{currentPost?.data.title}</h3>
            <time className="title-wrapper__date">
              {getDate(currentPost?.data.date)}
            </time>
          </section>
          <section className="desc-wrapper">
            <p className="desc-wrapper__desc">
              {currentPost?.data.description}
            </p>
          </section>
        </div>

        <figure className="image-wrapper">
          <img
            src={currentPost?.data.image_url}
            alt=""
            className="image-wrapper__image"
          />
        </figure>
      </div>
    </Loader>
  );
};
