import "./post.css";
import { Link } from "react-router-dom";

interface Post {
  post: IPost
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

export default function Post({ post }:Post) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c:any) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
