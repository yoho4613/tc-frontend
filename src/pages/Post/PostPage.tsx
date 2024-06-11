import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, viewPost } from "../../config/api.ts";
import { BiArrowBack } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../../Components/Navbar/Navbar.tsx";
import { BASE_URL } from "../../constant/config.ts";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth0();
  const [comment, setComment] = useState("");
  const [reportPopup, setReportPopup] = useState(false);
  const [reportComment, setReportComment] = useState("");
  useEffect(() => {
    if (id) {
      fetchPost(id);
      const pbox = localStorage.getItem("pbox");

      if (pbox && pbox.includes(id)) {
        return;
      } else {
        if (pbox) {
          localStorage.setItem("pbox", pbox + "," + id);
        } else {
          localStorage.setItem("pbox", id as string);
        }
        viewPost(id as string);
      }
    }
  }, [id]);

  const submitCommment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.length) {
      alert("Comment cannot be empty");
      return;
    }

    if (!user) {
      alert("Please login to comment");
      return;
    }

    const dbUser = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/mongodb/checkAuth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          username: user.name,
        }),
      }
    ).then((res) => res.json());

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/board/comment/createComment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          content: comment,
          userId: dbUser.id,
        }),
      }
    ).then((res) => res.json());
    setComment("");
    fetchPost(id as string);
  };

  const fetchPost = async (id: string) => {
    getPostById("/board/post/getPostById", id).then((res) => {
      setPost(res);
      setIsLoading(false);
    });
  };

  const reportPost = async (postId: string) => {
    alert("Reported Successfully");
    setReportPopup(false);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <Navbar />
      <div className="p-2 flex justify-between">
        <button
          onClick={() => history.back()}
          className="rounded-lg border-2 border-gray-500 flex items-center px-2 py-1 "
        >
          <BiArrowBack /> Back to Board
        </button>
        <button
          onClick={() => setReportPopup(true)}
          className="rounded-lg border-2 bg-red-500 text-white font-bold hover:bg-red-600 transition-all focus:bg-red-600 flex items-center px-2 py-1 "
        >
          Report
        </button>
      </div>
      <div className="p-4 sm:w-[90%] m-auto">
        {reportPopup && (
          <div className="fixed top-0 left-0 w-screen gap-6 h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center ">
            <div className="bg-white p-4 flex w-2/3 flex-col justify-center items-center ">
              <div className="flex gap-4 flex-col mb-6 w-[70%]">
                <label htmlFor="">Reason of Report</label>
                <textarea
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                  className="border p-1 "
                  placeholder="type here..."
                />
              </div>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => reportPost(post.id)}
                  className="rounded-lg border-2 bg-red-500 text-white font-bold hover:bg-red-600 transition-all focus:bg-red-600 flex items-center px-2 py-1 "
                >
                  Report
                </button>
                <button
                  onClick={() => setReportPopup(false)}
                  className="rounded-lg border-2 bg-red-500 text-white font-bold hover:bg-red-600 transition-all focus:bg-red-600 flex items-center px-2 py-1 "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div>
          <p className="text-center mb-6 text-gray-500">
            {new Date(post.createdAt).toDateString()}
          </p>
          <h1 className="font-extrabold text-3xl mb-2 border-b-2">
            {post.title}
          </h1>
          <div className="mb-4 flex justify-end">
            <p className="font-extrabold">{post.author.username}</p>
          </div>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></div>
        </div>

        <div className="border-t-2 mt-8 space-y-4">
          <h3 className="my-6 text-xl">Comments</h3>
          <form className="flex gap-4" onSubmit={(e) => submitCommment(e)}>
            <textarea
              disabled={!isAuthenticated}
              className="grow border p-2"
              cols={6}
              placeholder={isAuthenticated ? "Comment..." : "Login to comment"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!isAuthenticated}
              className="bg-blue-400 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </form>
          <div>
            {post.comments ? (
              <div>
                {post.comments
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((comment) => (
                    <div
                      key={comment.id}
                      className="border p-2 flex gap-4 justify-between"
                    >
                      <p className="w-[80%] text-sm">{comment.content}</p>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">
                          {comment.user.username}
                        </p>
                        <p className="text-xs">
                          {new Date(comment.createdAt).toDateString()} /{" "}
                          {new Date(comment.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div>No comments...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
