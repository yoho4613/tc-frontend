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
      <div className="p-4">
        <h1 className="font-extrabold text-2xl">{post?.title}</h1>
        <p>{post?.content}</p>
        <p>{post?.description}</p>
        <p>{post?.author.username}</p>
      </div>
    </div>
  );
};

export default PostPage;
