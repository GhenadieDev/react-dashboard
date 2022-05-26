import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "ebs-design";

import { postApi } from "api/posts";
import { Button, EBSForm, FormHeader, Input, Textarea } from "components/index";

import { Post } from "types/interfaces";

import "styles/EditPost.scss";
import "styles/common.scss";
import { useMutation, useQuery } from "react-query";

export const EditPost = () => {
  const { postID } = useParams();
  const [form] = useForm();

  const { data: post, isSuccess } = useQuery(
    "post",
    async () => await postApi.getPersonalPostById(postID)
  );

  const mutation = useMutation((fieldsValue: Post) =>
    postApi.editPost(fieldsValue)
  );

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue(post?.data);
    }
  }, [form, isSuccess, post?.data]);

  const submitHandler = async (values: Post) => {
    let newObj: Post = { ...post?.data, ...values };
    await mutation.mutateAsync(newObj);
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
          <Button
            submit
            type="primary"
            onClick={() => submitHandler}
            loading={mutation.isLoading}
          >
            Submit
          </Button>
        </EBSForm>
      </div>
    </div>
  );
};
