import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, viewPost } from "../../config/api.ts";
import { BiArrowBack } from "react-icons/bi";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPostById("/board/post/getPostById", id).then((res) => {
        setPost(res);
        setIsLoading(false);
      });
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

      // if (pbox) {
      //   if (!pbox.includes(id)) {
      //     localStorage.setItem("pbox", (pbox + "," + id) as string);
      //   } else {
      //     viewPost(id as string).then((res) => {
      //       localStorage.setItem("pbox", id as string);
      //       return res.json();
      //     });
      //   }
      // } else {
      //   viewPost(id as string).then((res) => {
      //     localStorage.setItem("pbox", id as string);
      //     return res.json();
      //   });
      // }
    }
  }, [id]);

  console.log(post);

  if (isLoading) return <div>Loading...</div>;

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <div className="p-2 flex justify-between">
        <button
          onClick={() => history.back()}
          className="rounded-lg border-2 border-gray-500 flex items-center px-2 py-1 "
        >
          <BiArrowBack /> Back to Board
        </button>
      </div>
      <div className="p-4 sm:w-[90%] m-auto">
        <div>
          <p className="text-center mb-6 text-gray-500">
            {new Date(post.createdAt).toDateString()}
          </p>
          <h1 className="font-extrabold text-3xl mb-6 border-b-2">
            {post.title}
          </h1>
          <div></div>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></div>
          <div className="mt-6 flex justify-end">
            <p className="mr-6">Author</p>
            <p className="font-extrabold">{post.author.username}</p>
          </div>
        </div>

        <div className="border-t-2 mt-8 space-y-4">
          <h3 className="my-6 text-xl">Comments</h3>
          <div className="flex gap-4">
            <textarea className="grow border p-2" cols={6} />
            <button className="bg-blue-400 text-white p-2 rounded-md">
              Submit
            </button>
          </div>
          <div>
            {post.comments ? (
              <div>
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border p-2 flex justify-between"
                  >
                    <p className="grow">{comment.content}</p>
                    <div className="flex flex-col">
                      <p>{comment.user.username}</p>
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
