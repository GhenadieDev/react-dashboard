import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "index";

import { PostCard } from "../components/PostCard";
import {
  Button,
  Table,
  Modal,
  MissingText,
  Checkbox,
  Footer,
} from "components/index";

import { Post, User } from "types/interfaces";
import { UserProfileContext } from "types/contexts";
import { postApi } from "api/posts";
import { Space } from "ebs-design";

import trash24 from "icons/trash24.png";

import "styles/Posts.scss";
import "styles/common.scss";

export const Posts = () => {
  const currentUser = useContext<User | null>(UserProfileContext);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [choosenPost, setChoosenPost] = useState<Post>({}); //pentru operator
  const [selectedPosts, setSelectedPosts] = useState<any[]>([]); //pentru admin
  const navigate = useNavigate();
  const location = useLocation();

  const deleteMutation = useMutation(
    async (postId: number | string | undefined) =>
      await postApi.deletePost(postId),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const { data: posts } = useQuery(
    "posts",
    () => {
      if (currentUser?.role === "operator") {
        return postApi.getPersonalPosts(currentUser.id);
      } else {
        return postApi.getAllPosts();
      }
    },
    {
      enabled: currentUser !== undefined && location.pathname === "/home/posts",
    }
  );

  const showConfirmationModal = (post: Post) => {
    setChoosenPost(post);
    setConfirmationModalVisible(true);
  };

  const deletePosts = () => {
    if (selectedPosts.length > 0) {
      selectedPosts.forEach((postId) => {
        deleteMutation.mutate(postId);
        setConfirmationModalVisible(false);
        setSelectedPosts([]);
      });
    } else {
      deleteMutation.mutate(choosenPost.id);
      setConfirmationModalVisible(false);
      setChoosenPost({});
    }
  };

  const handleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const postId = parseInt((e.target as HTMLInputElement).value);

    if (!selectedPosts.includes(postId)) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(
        selectedPosts.filter((selectedPostId) => {
          return selectedPostId !== postId;
        })
      );
    }
  };

  const handleChangeAll = () => {
    if (selectedPosts.length < posts.length) {
      setSelectedPosts(posts.map((post: Post) => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  return (
    <>
      <div className="posts">
        {currentUser?.role && currentUser.role === "operator" ? (
          <div className="btn-wrapper">
            <Link to="create">
              <Button type="primary">Add Post</Button>
            </Link>
          </div>
        ) : null}
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
          posts?.length > 0 ? (
            <article className="postscards-wrapper">
              {posts?.map((post: Post) => {
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
                      <Button>Edit</Button>
                    </Link>
                    <Button
                      type="dark"
                      onClick={() => showConfirmationModal(post)}
                    >
                      Delete
                    </Button>
                  </PostCard>
                );
              })}
            </article>
          ) : (
            <MissingText title="You have not added any post yet" />
          )
        ) : posts?.length > 0 ? (
          <Table
            columns={[
              {
                title: (
                  <Checkbox
                    checked={selectedPosts.length === posts.length}
                    onClick={handleChangeAll}
                  />
                ),
                render: (record: Post) => {
                  return (
                    <Checkbox
                      value={record.id}
                      checked={selectedPosts.includes(record.id)}
                      onClick={handleChange}
                    />
                  );
                },
              },
              {
                dataIndex: "title",
                title: "Title",
                onCell: (record: Post) => ({
                  onClick() {
                    navigate(`${record.id}`);
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
                    <Link to={`/home/posts/${record.id}/edit`}>
                      <Button>Edit</Button>
                    </Link>
                  );
                },
              },
            ]}
            data={posts}
          />
        ) : (
          <MissingText title="Posts have not added yet" />
        )}
        {selectedPosts.length > 0 ? (
          <Footer onClick={() => setConfirmationModalVisible(true)}>
            <img src={trash24} alt="trash" />
          </Footer>
        ) : null}
      </div>
    </>
  );
};
