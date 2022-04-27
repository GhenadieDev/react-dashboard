import { PostCard } from "../components/PostCard";
import { Button } from "components/index";
import { Post, User } from "types/interfaces";
import { useContext, useEffect, useState } from "react";
import { getPersonalPosts } from "api/posts";
import { UserProfileContext } from "types/contexts";
import { Link } from "react-router-dom";

import styles from "../../../styles/RootPages.module.scss";
import "styles/Posts.scss";

export const Posts = () => {
  const currentUser = useContext<User | null>(UserProfileContext);
  const [posts, setPosts] = useState<Post[]>([]);

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
      <div className="btn-wrapper">
        <Link to="/home/posts/create">
          <Button variant="primary">Add Post</Button>
        </Link>
      </div>
      <div className="postscards-wrapper">
        {posts.length > 0
          ? posts.map((post) => {
              return (
                <Link to={`/home/posts/${post.id}`} key={post.id}>
                  <PostCard
                    image_url={post.image_url}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                  />
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};
