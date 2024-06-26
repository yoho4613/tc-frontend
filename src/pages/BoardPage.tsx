import React, { useEffect, useState } from "react";
import { getAllPosts } from "../config/api.ts";
import Navbar from "../Components/Navbar/Navbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Components/Buttons/LogoutButton.tsx";

const BoardPage = () => {
  const { isAuthenticated, user, loginWithRedirect, loginWithPopup } =
    useAuth0();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const router = useNavigate();

  useEffect(() => {
    if (!searchParam.has("category")) {
      router("/board");
    }
  }, []);

  useEffect(() => {
    getAllPosts("/board/post/getAllPosts").then((res) => setPosts(res));
  }, [searchParam]);

  useEffect(() => {
    if (posts.length) {
      console.log(posts);
      const category = searchParam.get("category");
      if (!category || category === "all") {
        setFilteredPosts(posts);
      } else {
        setFilteredPosts(
          posts.filter(
            (post) =>
              post.category.name.toLowerCase() === category.toLowerCase()
          )
        );
      }
    }
  }, [posts, searchParam]);

  const createPost = () => {
    if (!isAuthenticated || !user) {
      loginWithPopup();
    } else {
      router("/post/create");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-2 border">
        <div className="flex justify-end mb-2">
          <button
            className="p-1.5 bg-blue-600 rounded-full border"
            onClick={() => createPost()}
          >
            <BiPlus color="white" size={24} />
          </button>
        </div>
        <div className="flex w-full">
          <p className="border w-[60%] sm:w-[75%] text-xs sm:text-sm p-1 sm:p-2 font-bold">
            Name
          </p>
          <p className="border w-[15%] sm:w-[10%] text-xs sm:text-sm p-1 sm:p-2 font-bold">
            View
          </p>
          <p className="border w-[25%] sm:w-[15%] text-xs sm:text-sm p-1 sm:p-2 font-bold">
            Author
          </p>
        </div>
        <div className="w-full">
          {filteredPosts
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((post, index) => (
              <div
                key={post.id}
                className={`w-full flex shadow-md rounded border ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white "
                }`}
              >
                <a
                  className="w-[60%] sm:w-[75%] text-xs  p-1 sm:p-2  sm:text-sm border"
                  href={`/board/post/${post.id}`}
                >
                  <h2 className="text-xs sm:text-sm font-bold mb-2">
                    {post.title}
                  </h2>
                  <p className="text-xs">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </a>
                <a
                  className="w-[15%] sm:w-[10%] p-2 text-sm border"
                  href={`/board/post/${post.id}`}
                >
                  {post.views}
                </a>
                <p className="w-[25%] sm:w-[15%] text-xs sm:text-sm p-1 sm:p-2border">
                  {post.author.username}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
