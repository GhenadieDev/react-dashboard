import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { postApi } from "api/posts";
import {
  Button,
  Form,
  FormHeader,
  Input,
  Loader,
  TextArea,
} from "components/index";

import { Post } from "types/interfaces";

import { useLoading } from "hooks/useLoading";
import "styles/EditPost.scss";
import "styles/common.scss";

export const EditPost = () => {
  const { postID } = useParams();
  const [currentPost, setCurrentPost] = useState<Post>({});
  const [isLoading, toggleLoading] = useLoading();

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
    toggleLoading();
    postApi.editPost(currentPost).then((res) => {
      if (res?.status === 200) {
        toggleLoading();
      }
    });
  };

  return (
    <div className="edit-post">
      <div className="form-wrapper">
        <Form>
          <div className="header-container flex">
            <FormHeader title="Edit Post" />
            {isLoading ? <Loader /> : null}
          </div>
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
          <Button variant="primary" onClick={submitHandler}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
