import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getDate } from "utils/getDate";
import { useMutation, useQuery } from "react-query";
import { postApi } from "api/posts";
import { Button, Loader, Modal } from "components/index";

import { Post } from "types/interfaces";
import { Space } from "ebs-design";

import "styles/Post.scss";

export const PostPage = () => {
  const navigate = useNavigate();
  const { postID } = useParams();
  const [isConfirmationModalVisible, setConfirmationModal] = useState(false);

  const { data: currentPost, isLoading } = useQuery(
    "postDetails",
    async () => await postApi.getPersonalPostById(postID)
  );

  const deleteMutation = useMutation(
    async (post: Post) => await postApi.deletePost(post),
    {
      onSuccess: () => {
        navigate("/home/posts");
      },
    }
  );

  const deleteHandler = () => {
    deleteMutation.mutate(currentPost?.data);
  };

  return (
    <Loader fade fixed height="100%" size="regular" loading={isLoading}>
      <Modal
        title="You're gonna delete this post. Are you sure?"
        open={isConfirmationModalVisible}
        mask
      >
        <Modal.Footer>
          <Space>
            <Button onClick={() => setConfirmationModal(false)}>Cancel</Button>
            <Button onClick={deleteHandler}>Submit</Button>
          </Space>
        </Modal.Footer>
      </Modal>
      <div className="post">
        <div className="text-wrapper">
          <section className="title-wrapper">
            <h3 className="title-wrapper__title">{currentPost?.data.title}</h3>
            <time className="title-wrapper__date">
              {getDate(currentPost?.data.date)}
            </time>
          </section>
          <section className="desc-wrapper">
            <p className="desc-wrapper__desc">
              {currentPost?.data.description}
            </p>
          </section>
          <div className="btns">
            <Button
              onClick={() =>
                navigate(`/home/posts/${currentPost?.data.id}/edit`)
              }
            >
              Edit
            </Button>
            <Button type="dark" onClick={() => setConfirmationModal(true)}>
              Delete
            </Button>
          </div>
        </div>
        <figure className="image-wrapper">
          <img
            src={currentPost?.data.image_url}
            alt=""
            className="image-wrapper__image"
          />
        </figure>
      </div>
    </Loader>
  );
};
