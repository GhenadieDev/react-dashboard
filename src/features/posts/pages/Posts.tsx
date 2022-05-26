import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import { PostCard } from "../components/PostCard";
import { Button, Table, Modal } from "components/index";
import { AufContainer } from "features/auf_container/AufContainer";

import { Post, User } from "types/interfaces";
import { UserProfileContext } from "types/contexts";
import { postApi } from "api/posts";
import { Space } from "ebs-design";

import "styles/Posts.scss";
import "styles/common.scss";

export const Posts = () => {
  const currentUser = useContext<User | null | undefined>(UserProfileContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [choosenPost, setChoosenPost] = useState<Post>({});
  const navigate = useNavigate();

  const deleteMutation = useMutation(
    async (choosenPost: Post) => await postApi.deletePost(choosenPost),
    {
      onSuccess: async () => {
        const personalPosts = await postApi.getPersonalPosts(currentUser?.id);
        setPosts(personalPosts.data);
      },
    }
  );

  const showConfirmationModal = (post: Post) => {
    setChoosenPost(post);
    setConfirmationModalVisible(true);
  };

  const deletePosts = async () => {
    await deleteMutation.mutateAsync(choosenPost);
    setConfirmationModalVisible(false);
    setChoosenPost({});
  };

  useEffect(() => {
    if (currentUser?.role && currentUser.role === "operator") {
      postApi.getPersonalPosts(currentUser?.id).then((res) => {
        if (res.data.length > 0) {
          setPosts(res.data);
        }
      });
    } else {
      postApi.getAllPosts().then((res) => {
        if (res?.status === 200) {
          setPosts(res.data);
        }
      });
    }
  }, [currentUser?.id, currentUser?.role]);

  return (
    <AufContainer>
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
          <div className="btn-wrapper">
            <Link to="/home/posts/create">
              <Button type="primary">Add Post</Button>
            </Link>
          </div>
        ) : null}
        {currentUser?.role && currentUser.role === "operator" ? (
          <article className="postscards-wrapper">
            {posts?.length > 0
              ? posts.map((post) => {
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
                })
              : null}
          </article>
        ) : (
          <Table
            columns={[
              {
                dataIndex: "title",
                title: "Title",
                onCell: (record) => ({
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
            data={posts}
          />
        )}
      </div>
    </AufContainer>
  );
};
