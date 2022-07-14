import { useContext } from "react";
import { useMutation } from "react-query";

import { postApi } from "api/posts";
import { Button, EBSForm, FormHeader, Input, Textarea } from "components/index";

import { UserProfileContext } from "types/contexts";
import { Post } from "types/interfaces";

import { useForm } from "ebs-design";
import "styles/CreatePost.scss";

export const CreatePost = () => {
  const currentUser = useContext(UserProfileContext);
  const [form] = useForm();

  const mutation = useMutation((post: Post) => postApi.createPost(post), {
    onSuccess: () => {
      form.resetFields();
    },
  });

  const submitHandler = (values: Post) => {
    const post: Post = {
      authorId: currentUser?.id,
      authorName: currentUser?.name + " " + currentUser?.surname,
      date: new Date(),
      title: values.title,
      description: values.description,
      image_url: values.image_url,
    };

    mutation.mutate(post);
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
            <Button
              submit
              type="primary"
              onClick={() => submitHandler}
              loading={mutation.isLoading}
            >
              Submit
            </Button>
          </div>
        </EBSForm>
      </div>
    </div>
  );
};
