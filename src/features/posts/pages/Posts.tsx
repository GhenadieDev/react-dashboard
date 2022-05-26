import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "index";

import { PostCard } from "../components/PostCard";
import {
  Button,
  Table,
  Modal,
  Loader,
  MissingDataText,
} from "components/index";
import { AufContainer } from "features/auf_container/AufContainer";

import { Post, User } from "types/interfaces";
import { UserProfileContext } from "types/contexts";
import { postApi } from "api/posts";
import { Space } from "ebs-design";

import "styles/Posts.scss";
import "styles/common.scss";

export const Posts = () => {
  const currentUser = useContext<User | null | undefined>(UserProfileContext);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [choosenPost, setChoosenPost] = useState<Post>({});
  const navigate = useNavigate();

  const deleteMutation = useMutation(
    async (choosenPost: Post) => await postApi.deletePost(choosenPost),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const { data: posts, isLoading } = useQuery("posts", async () => {
    if (currentUser?.role === "operator") {
      return await postApi.getPersonalPosts(currentUser.id);
    } else {
      return await postApi.getAllPosts();
    }
  });

  const showConfirmationModal = (post: Post) => {
    setChoosenPost(post);
    setConfirmationModalVisible(true);
  };

  const deletePosts = async () => {
    await deleteMutation.mutateAsync(choosenPost);
    setConfirmationModalVisible(false);
    setChoosenPost({});
  };

  return (
    <AufContainer>
      {currentUser?.role && currentUser.role === "operator" ? (
        <div className="btn-wrapper">
          <Link to="/home/posts/create">
            <Button type="primary">Add Post</Button>
          </Link>
        </div>
      ) : null}
      <Space
        direction="vertical"
        align="center"
        justify="center"
        style={{ height: "100%" }}
      >
        <Loader fade height="100%" size="regular" fixed loading={isLoading}>
          {posts?.data.length === 0 ? (
            <MissingDataText title="Posts have not added yet" />
          ) : (
            <div className="posts">
              <Modal
                title="You're gonna delete this post. Are you sure?"
                open={isConfirmationModalVisible}
                mask
              >
                <Modal.Footer>
                  <Space>
                    <Button onClick={() => setConfirmationModalVisible(false)}>
                      Cancel
                    </Button>
                    <Button onClick={deletePosts}>Submit</Button>
                  </Space>
                </Modal.Footer>
              </Modal>
              {currentUser?.role && currentUser.role === "operator" ? (
                <article className="postscards-wrapper">
                  {posts?.data.map((post: Post) => {
                    return (
                      <PostCard
                        key={post.id}
                        image_url={post.image_url}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        id={post.id}
                      >
                        <Link to={`/home/posts/${post.id}/edit`}>
                          <Button type="primary">Edit</Button>
                        </Link>
                        <Button
                          type="primary"
                          onClick={() => showConfirmationModal(post)}
                        >
                          Delete
                        </Button>
                      </PostCard>
                    );
                  })}
                </article>
              ) : (
                <Table
                  columns={[
                    {
                      dataIndex: "title",
                      title: "Title",
                      onCell: (record: Post) => ({
                        onClick() {
                          navigate(`/home/posts/${record.id}`);
                        },
                      }),
                    },
                    {
                      dataIndex: "image_url",
                      title: "Image URL",
                    },
                    {
                      dataIndex: "date",
                      title: "Created At",
                    },
                    {
                      dataIndex: "authorName",
                      title: "Author",
                    },
                    {
                      title: "Actions",
                      render: (record) => {
                        return (
                          <div className="actions-btns-wrapper">
                            <Link to={`/home/posts/${record.id}/edit`}>
                              <Button type="primary">Edit</Button>
                            </Link>
                            <Button
                              type="primary"
                              onClick={() => showConfirmationModal(record)}
                            >
                              Delete
                            </Button>
                          </div>
                        );
                      },
                    },
                  ]}
                  data={posts?.data}
                />
              )}
            </div>
          )}
        </Loader>
      </Space>
    </AufContainer>
  );
};
