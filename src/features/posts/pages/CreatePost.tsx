import { createPost } from "api/posts";
import { Button, Form, FormHeader, Input, TextArea } from "components/index";
import React, { useContext, useEffect, useState } from "react";

import "styles/CreatePost.scss";
import { UserProfileContext } from "types/contexts";
import { dateTime } from "types/date";
import { Post } from "types/interfaces";

export const CreatePost = () => {
  const currentUser = useContext(UserProfileContext);
  const [post, setPost] = useState<Post>({});

  useEffect(() => {
    setPost((prevState) => ({
      ...prevState,
      authorId: currentUser?.id,
      date: dateTime,
    }));
  }, [currentUser?.id]);

  const onChangeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createPost(post);
  };

  return (
    <div className="create-post">
      <div className="form-wrapper">
        <Form>
          <FormHeader title="Add Post" />
          <Input
            placeholder="Title"
            type="text"
            onChange={onChangeHandler}
            name="title"
          />
          <div className="desc-wrapper">
            <TextArea
              placeholder="Description"
              onChange={onChangeHandler}
              name="description"
            />
          </div>
          <Input
            type="text"
            placeholder="Image URL"
            onChange={onChangeHandler}
            name="image_url"
          />
          <div className="btns-wrapper">
            <Button variant="primary" onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
