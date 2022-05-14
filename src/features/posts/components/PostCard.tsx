import { Link } from "react-router-dom";
import { Post } from "types/interfaces";

import { getDate } from "utils/getDate";

import "styles/PostCard.scss";

export const PostCard: React.FC<Post> = ({ children, ...props }) => {
  return (
    <div className="postcard">
      <div className="postcard-header">
        <h4 className="postcard-header__title">{props.title}</h4>
        <time className="postcard-header__date">{getDate(props.date)}</time>
      </div>

      <Link to={`/home/posts/${props.id}`} className="post-link">
        <figure className="image-wrapper">
          <img
            src={props.image_url}
            alt="post-img"
            className="image-wrapper__post-img"
          />
        </figure>
        <div className="desc-wrapper">
          <p className="desc-wrapper__desc">{props.description}</p>
        </div>
      </Link>
      <div className="btns-wrapper">{children}</div>
    </div>
  );
};
