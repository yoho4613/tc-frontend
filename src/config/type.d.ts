type Comment = {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: string;
};

type Category = {
  name: string;
  createdAt: Date;
};

type Post = {
  id: string;
  title: string;
  content: string;
  description: string;
  image: string[];
  createdAt: string;
  authorId: Date;
  author: User;
  category: Category;
  categoryId: string;
  report: Report;
  views: number;
  comments: {
    id: string;
    content: string;
    postId: string;
    userId: string;
    createdAt: Date;
    user: User;
  }[];
};

type Report = {
  id: string;
  postId: string;
  userId: string;
  reason: string;
  createdAt: string;
};

type category = {
  id: string;
  name: string;
};

// type User = {
//   id: string;
//   username: string;
//   email: string;
// };

type User = {
  id: string;
  username: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

type Capsule = {
  price: bigint;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenURI: string;
  capsuleImage: string;
  revealed: boolean;
};
