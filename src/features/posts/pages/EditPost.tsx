import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "ebs-design";

import { postApi } from "api/posts";
import { Button, EBSForm, FormHeader, Input, Textarea } from "components/index";

import { Post } from "types/interfaces";

import "styles/EditPost.scss";
import "styles/common.scss";

export const EditPost = () => {
  const { postID } = useParams();
  const [currentPost, setCurrentPost] = useState<Post>({});
  const [form] = useForm();

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

  useEffect(() => {
    if (currentPost) {
      form.setFieldsValue(currentPost);
    }
  }, [currentPost, form]);

  const submitHandler = async (values: Post) => {
    let newObj = { ...currentPost, ...values };
    await postApi.editPost(newObj);
  };

  return (
    <div className="edit-post">
      <div className="form-wrapper">
        <EBSForm form={form} onFinish={submitHandler}>
          <div className="header-container flex">
            <FormHeader title="Edit Post" />
          </div>
          <EBSForm.Field name="title">
            <Input placeholder="Title" />
          </EBSForm.Field>
          <EBSForm.Field name="description">
            <Textarea placeholder="Description" />
          </EBSForm.Field>
          <EBSForm.Field name="image_url">
            <Input placeholder="Image URL" />
          </EBSForm.Field>
          <Button submit type="primary" onClick={() => submitHandler}>
            Submit
          </Button>
        </EBSForm>
      </div>
    </div>
  );
};
