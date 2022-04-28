import { createPost } from "api/posts";
import { Button, Form, FormHeader, Input, TextArea } from "components/index";
import React, { useContext, useEffect, useState } from "react";

import "styles/CreatePost.scss";
import { UserProfileContext } from "types/contexts";
import { dateTime } from "types/date";
import { Post } from "types/interfaces";

export const CreatePost = () => {
  const currentUser = useContext(UserProfileContext);
  const [post, setPost] = useState<Post>({
    title: "",
    image_url: "",
    description: "",
  });

  useEffect(() => {
    setPost((prevState) => ({
      ...prevState,
      author: {
        ...prevState.author,
        id: currentUser?.id,
        fullName: currentUser?.name + " " + currentUser?.surname,
      },
      date: dateTime,
    }));
  }, [currentUser?.id, currentUser?.name, currentUser?.surname]);

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
    createPost(post).then((res) => {
      if (res?.status === 201) {
        setPost((prevState) => ({
          ...prevState,
          title: "",
          description: "",
          image_url: "",
        }));
      }
    });
  };

  return (
    <div className="create-post">
      <div className="form-wrapper">
        <Form>
          <FormHeader title="Add Post" />
          <Input
            value={post.title}
            placeholder="Title"
            type="text"
            onChange={onChangeHandler}
            name="title"
          />
          <div className="desc-wrapper">
            <TextArea
              value={post.description}
              placeholder="Description"
              onChange={onChangeHandler}
              name="description"
            />
          </div>
          <Input
            value={post.image_url}
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
