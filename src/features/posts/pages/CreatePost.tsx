import React, { useContext, useEffect, useState } from "react";
import { postApi } from "api/posts";
import {
  Button,
  Form,
  FormHeader,
  Input,
  Loader,
  TextArea,
} from "components/index";

import { UserProfileContext } from "types/contexts";
import { dateTime } from "types/date";
import { Post } from "types/interfaces";

import { useLoading } from "hooks/useLoading";

import "styles/CreatePost.scss";
import "styles/common.scss";

export const CreatePost = () => {
  const currentUser = useContext(UserProfileContext);
  const [post, setPost] = useState<Post>({
    title: "",
    image_url: "",
    description: "",
  });
  const [isLoading, toggleLoading] = useLoading();

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
    toggleLoading();
    postApi.createPost(post).then((res) => {
      if (res?.status === 201) {
        setPost((prevState) => ({
          ...prevState,
          title: "",
          description: "",
          image_url: "",
        }));
        toggleLoading();
      }
    });
  };

  return (
    <div className="create-post">
      <div className="form-wrapper">
        <Form>
          <div className="header-container flex">
            <FormHeader title="Add Post" />
            {isLoading ? <Loader /> : null}
          </div>
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
