import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { postApi } from "api/posts";
import { Button, EBSForm, FormHeader, Input, Textarea } from "components/index";

import { Post } from "types/interfaces";

import "styles/EditPost.scss";
import "styles/common.scss";

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
            authorId: res.data.authorId,
            authorName: res.data.authorName,
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

  const submitHandler = async () => {
    await postApi.editPost(currentPost);
  };

  return (
    <div className="edit-post">
      <div className="form-wrapper">
        <EBSForm>
          <div className="header-container flex">
            <FormHeader title="Edit Post" />
          </div>
          <Input defaultValue={currentPost.title} name="title" />
          <div className="desc-wrapper">
            <Textarea
              defaultValue={currentPost.description}
              //onChange={handleChange}
              name="description"
            />
          </div>
          <Input defaultValue={currentPost.image_url} name="image_url" />
          <Button type="primary" onClick={submitHandler}>
            Submit
          </Button>
        </EBSForm>
      </div>
    </div>
  );
};
