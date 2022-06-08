import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "index";

import { PostCard } from "../components/PostCard";
import {
  Button,
  Table,
  Modal,
  Loader,
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
  const [choosenPost, setChoosenPost] = useState<Post>({});
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const deleteMutation = useMutation(
    async (choosenPost: Post) => await postApi.deletePost(choosenPost),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const { data: posts, isLoading } = useQuery(
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

  const [checkedState, setCheckedState] = useState(
    new Array(posts?.length).fill(false)
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

  const handleChange = (position?: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    console.log(checkedState.length);
  }, [checkedState, posts]);

  return (
    <>
      <Loader fade height="100%" size="regular" fixed loading={isLoading}>
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
                  render: (value: any, record: Post, index: number) => {
                    return (
                      <Checkbox
                        checked={checkedState[index]}
                        onChange={() => handleChange(index)}
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
          {checkedState.find((item) => item === true) !== undefined ? (
            <Footer
              onClick={() => console.log("selected posts: ", selectedPosts)}
            >
              <img src={trash24} alt="trash" />
            </Footer>
          ) : null}
        </div>
      </Loader>
    </>
  );
};
