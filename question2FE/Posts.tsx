import React, { useState, useEffect } from 'react';
import axios from 'axios';
type Post =  {
  postId: string;
  content: string;
  commentCount: number;
}

const TrendingPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://20.244.56.144/test/posts/:postid/comments")
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div className='bg-black h-screen flex justify-center'>
      <h2>Trending Posts</h2>
      {posts.map((post, index) => {
  return (
    <div key={post.postId}>
      <h1 className="text-2xl text-white">{post.postId}</h1>
      <h1 className="text-xl text-red-500">{post.content}</h1>
    </div>
  );
})}

    </div>
  );
};

export default TrendingPosts;
