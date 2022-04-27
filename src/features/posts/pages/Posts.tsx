import { PostCard } from "../components/PostCard";
import { Button, ConfirmationModal } from "components/index";
import { Post, User } from "types/interfaces";
import { useContext, useEffect, useState } from "react";
import { deletePost, getPersonalPosts } from "api/posts";
import { UserProfileContext } from "types/contexts";
import { Link } from "react-router-dom";

import styles from "../../../styles/RootPages.module.scss";
import "styles/Posts.scss";
import { ConfirmationModalTitle } from "components/ConfirmationModalTitle";

export const Posts = () => {
  const currentUser = useContext<User | null>(UserProfileContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [choosenPost, setChoosenPost] = useState<Post>({});

  const showConfirmationModal = (post: Post) => {
    setConfirmationModalVisible(true);
    setChoosenPost(post);
  };

  const deletePosts = () => {
    deletePost(choosenPost).then((res) => {
      if (res) {
        getPersonalPosts(currentUser?.id).then((res) => {
          setPosts(res);
        });
      }
    });
  };

  useEffect(() => {
    getPersonalPosts(currentUser?.id).then((res: Post[]) => {
      if (res.length > 0) {
        res.forEach((post) => {
          setPosts((prevState) => [...prevState, post]);
        });
      }
    });
  }, [currentUser?.id]);

  return (
    <div className={`${styles.page} posts`}>
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
      <div className="btn-wrapper">
        <Link to="/home/posts/create">
          <Button variant="primary">Add Post</Button>
        </Link>
      </div>
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
                  <Button variant="primary">Edit</Button>
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
    </div>
  );
};
