import { Post } from "types/interfaces";
import { Link } from "react-router-dom";

import "styles/PostCard.scss";

export const PostCard: React.FC<Post> = ({ children, ...props }) => {
  return (
    <div className="postcard">
      <p className="date">
        {props.date
          ?.toString()
          .substring(0, props.date.toString().indexOf("T"))}
      </p>

      <Link to={`/home/posts/${props.id}`} className="post-link">
        <div className="image-wrapper">
          <img
            src={props.image_url}
            alt="post-img"
            className="image-wrapper__post-img"
          />
        </div>
        <h4 className="post-link__title">{props.title}</h4>
        <p className="post-link__desc">{props.description}</p>
      </Link>
      <div className="btns-wrapper">{children}</div>
    </div>
  );
};
