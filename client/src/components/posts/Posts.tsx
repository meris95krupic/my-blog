import Post from "../post/Post";
import "./posts.css";

interface IPosts {
  posts: IPost[]
}

interface IPost {
  _id: string,
  categories: any[],
  createdAt: string,
  desc: string,
  photo: string,
  title: string,
  updatedAt: string,
  username: string
}

export default function Posts({ posts }:IPosts) {
  return (
    <div className="posts">
      {posts.map((p:IPost) => (
          <Post post={p} />
        )
      )}
    </div>
  );
}


