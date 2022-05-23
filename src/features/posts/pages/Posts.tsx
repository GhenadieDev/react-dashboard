import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PostCard } from "../components/PostCard";
import {
  Button,
  ConfirmationModal,
  ConfirmationModalHeader,
  Table,
} from "components/index";
import { AufContainer } from "features/auf_container/AufContainer";

import { Post, User } from "types/interfaces";
import { UserProfileContext } from "types/contexts";
import { postApi } from "api/posts";

import "styles/Posts.scss";
import "styles/common.scss";

export const Posts = () => {
  const currentUser = useContext<User | null | undefined>(UserProfileContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [choosenPost, setChoosenPost] = useState<Post>({});
  const navigate = useNavigate();

  const showConfirmationModal = (post: Post) => {
    setConfirmationModalVisible(true);
    setChoosenPost(post);
  };

  const deletePosts = async () => {
    const res = await postApi.deletePost(choosenPost);
    if (res?.status === 200) {
      const personalPosts = await postApi.getPersonalPosts(currentUser?.id);
      setPosts(personalPosts);
    }
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
            <ConfirmationModalHeader>
              <div className="header-container flex">
                <h4>You're gonna delete this post. Are you sure?</h4>
              </div>
            </ConfirmationModalHeader>
          </ConfirmationModal>
        ) : null}
        {currentUser?.role && currentUser.role === "operator" ? (
          <div className="btn-wrapper">
            <Link to="/home/posts/create">
              <Button type="primary">Add Post</Button>
            </Link>
          </div>
        ) : null}
        {currentUser?.role && currentUser.role === "operator" ? (
          <article className="postscards-wrapper">
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
              },
            ]}
            data={posts}
          />
        )}
      </div>
    </AufContainer>
  );
};

/*
<Table className="user-posts">
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
                        <td>
                          <time>{post.date}</time>
                        </td>
                        <td>{post.author?.fullName}</td>
                        <td>
                          <div className="actions-btns-wrapper">
                            <Link
                              to={`/home/posts/${post.id}/edit`}
                              state={post}
                            >
                              <Button type="primary">Edit</Button>
                            </Link>
                            <Button
                              type="primary"
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
*/
