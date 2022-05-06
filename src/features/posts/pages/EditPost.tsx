import { postApi } from "api/posts";
import { Button, Form, FormHeader, Input, TextArea } from "components/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "types/interfaces";
import "styles/EditPost.scss";

export const EditPost = () => {
  const { postID } = useParams();
  const [currentPost, setCurrentPost] = useState<Post>({});

  useEffect(() => {
    if (postID) {
      postApi.getPersonalPostById(postID).then((res) => {
        if (res?.status === 200) {
          setCurrentPost((prevState) => ({
            ...prevState,
            date: res.data.date,
            title: res.data.title,
            description: res.data.description,
            image_url: res.data.image_url,
            id: res.data.id,
            author: {
              ...prevState.author,
              id: res.data.author.id,
              fullName: res.data.author.fullName,
            },
          }));
        }
      });
    }
  }, [postID]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setCurrentPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    postApi.editPost(currentPost);
  };

  return (
    <div className="edit-post">
      <div className="form-wrapper">
        <Form>
          <FormHeader title="Edit Post" />
          <Input
            defaultValue={currentPost.title}
            onChange={handleChange}
            name="title"
          />
          <div className="desc-wrapper">
            <TextArea
              defaultValue={currentPost.description}
              onChange={handleChange}
              name="description"
            />
          </div>
          <Input
            defaultValue={currentPost.image_url}
            onChange={handleChange}
            name="image_url"
          />
          <Input
            defaultValue={currentPost.date
              ?.toString()
              .substring(0, currentPost.date.toString().indexOf("T"))}
          />
          <Button variant="primary" onClick={submitHandler}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
