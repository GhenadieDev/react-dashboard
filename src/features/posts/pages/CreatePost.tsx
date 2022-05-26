import { useContext } from "react";
import { postApi } from "api/posts";
import { Button, EBSForm, FormHeader, Input, Textarea } from "components/index";
import { useForm } from "ebs-design";

import { UserProfileContext } from "types/contexts";
import { dateTime } from "types/date";
import { Post } from "types/interfaces";

import "styles/CreatePost.scss";

export const CreatePost = () => {
  const currentUser = useContext(UserProfileContext);
  const [form] = useForm();

  const submitHandler = (values: Post) => {
    const post: Post = {
      authorId: currentUser?.id,
      authorName: currentUser?.name + " " + currentUser?.surname,
      date: dateTime,
      title: values.title,
      description: values.description,
      image_url: values.image_url,
    };
    postApi.createPost(post).then((res) => {
      if (res?.status === 201) {
        form.resetFields();
      }
    });
  };

  return (
    <div className="create-post">
      <div className="form-wrapper">
        <EBSForm onFinish={submitHandler} form={form}>
          <div className="header-container flex">
            <FormHeader title="Add Post" />
          </div>
          <EBSForm.Field
            initialValue=""
            name="title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Title" type="text" isClearable />
          </EBSForm.Field>
          <EBSForm.Field
            initialValue=""
            name="description"
            rules={[{ required: true }]}
          >
            <Textarea placeholder="Description" />
          </EBSForm.Field>
          <EBSForm.Field
            initialValue=""
            name="image_url"
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="Image URL" isClearable />
          </EBSForm.Field>
          <div className="btns-wrapper">
            <Button submit type="primary" onClick={() => submitHandler}>
              Submit
            </Button>
          </div>
        </EBSForm>
      </div>
    </div>
  );
};
