import { PostCard } from "../components/PostCard";
import {
  Button,
  ConfirmationModal,
  Table,
  ConfirmationModalTitle,
} from "components/index";
import { Post, User } from "types/interfaces";
import { useContext, useEffect, useState } from "react";
import { postApi } from "api/posts";
import { UserProfileContext } from "types/contexts";
import { Link, useNavigate } from "react-router-dom";

import { AufContainer } from "features/auf_container/AufContainer";

import "styles/Posts.scss";

export const Posts = () => {
  const currentUser = useContext<User | null>(UserProfileContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [choosenPost, setChoosenPost] = useState<Post>({});
  const navigate = useNavigate();

  const showConfirmationModal = (post: Post) => {
    setConfirmationModalVisible(true);
    setChoosenPost(post);
  };

  const deletePosts = () => {
    postApi.deletePost(choosenPost).then((res) => {
      if (res) {
        postApi.getPersonalPosts(currentUser?.id).then((res) => {
          setPosts(res);
        });
      }
    });
    setConfirmationModalVisible(false);
  };

  useEffect(() => {
    if (currentUser?.role && currentUser.role === "operator") {
      postApi.getPersonalPosts(currentUser?.id).then((res: Post[]) => {
        if (res.length > 0) {
          setPosts(res);
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
        {isConfirmationModalVisible ? (
          <ConfirmationModal
            setOpen={setConfirmationModalVisible}
            clickHandler={deletePosts}
          >
            <ConfirmationModalTitle>
              You're gonna delete this post. Are you sure?
            </ConfirmationModalTitle>
          </ConfirmationModal>
        ) : null}
        {currentUser?.role && currentUser.role === "operator" ? (
          <div className="btn-wrapper">
            <Link to="/home/posts/create">
              <Button variant="primary">Add Post</Button>
            </Link>
          </div>
        ) : null}
        {currentUser?.role && currentUser.role === "operator" ? (
          <div className="postscards-wrapper">
            {posts.length > 0
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
                        <Button variant="primary">Edit</Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => showConfirmationModal(post)}
                      >
                        Delete
                      </Button>
                    </PostCard>
                  );
                })
              : null}
          </div>
        ) : (
          <Table className="user-posts">
            <thead>
              <tr>
                <th>Title</th>
                <th>Image URL</th>
                <th>Created At</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0
                ? posts.map((post) => {
                    return (
                      <tr key={post.id} className="table-row">
                        <td
                          onClick={() => navigate(`/home/posts/${post.id}`)}
                          className="post-link"
                        >
                          {post.title}
                        </td>
                        <td>{post.image_url}</td>
                        <td>{post.date}</td>
                        <td>{post.author?.fullName}</td>
                        <td>
                          <div className="actions-btns-wrapper">
                            <Link
                              to={`/home/posts/${post.id}/edit`}
                              state={post}
                            >
                              <Button variant="primary">Edit</Button>
                            </Link>
                            <Button
                              variant="danger"
                              onClick={() => showConfirmationModal(post)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        )}
      </div>
    </AufContainer>
  );
};
