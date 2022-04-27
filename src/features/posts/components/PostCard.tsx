import { Button } from "components/index";

import { Post } from "types/interfaces";
import "styles/PostCard.scss";

export const PostCard = (props: Post) => {
  return (
    <div className="postcard">
      <p className="date">
        {props.date
          ?.toString()
          .substring(0, props.date.toString().indexOf("T"))}
      </p>
      <img src={props.image_url} alt="post-img" />
      <h4>{props.title}</h4>
      <p className="desc">{props.description}</p>
      <div className="btns-wrapper">
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
};
