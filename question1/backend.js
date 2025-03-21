import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { comment } from "postcss";

dotenv.config();


const userSchema = new mongoose.Schema({
    userId: Number,
    postCount: Number,
  });

let postsSchema = new mongoose.Schema({
  id: {type: Number},
    userid: {type: Number},
    content: {type: String},
})

const commentSchema = new mongoose.Schema({
  id: Number,
  postid: Number,
  content: String
});
 

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.get('/users',(req, res)=> {
  const topUsers = userSchema.sort((a,b)=> b.postCount -a.postCount).slice(0,5);
  res.json(topUsers)
});


app.get('/posts',(req, res)=> {
    let maximusComments = 0;
    const popularPosts = [];

    if(req.query.type === 'popular') {
        for(let post of postsSchema){
            if(post.comments.length > maximusComments){
                maximusComments = post.comments.length;
                popularPosts.push(post);
            }else if(post.comments.length === maximusComments){
                popularPosts.push(post);
            }
        }
        res.json(popularPosts);
    } else if(req.query.type === 'latest' ) {
     const latest = postsSchema.sort((a,b) => )
    }
})

app.get("/fetchComments/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const response = await axios.get(`http://20.244.56.144/test/posts/${postId}/comments`, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNTM0Mzc1LCJpYXQiOjE3NDI1MzQwNzUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBjOGRjZDE0LWFiZjgtNGQ3MS1hMWYyLTcyNTU2OTBmMTFlYyIsInN1YiI6InNpbmdoc3VyZW5kZXIyODIzMUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJhZmZvcmRtZWQiLCJjbGllbnRJRCI6IjBjOGRjZDE0LWFiZjgtNGQ3MS1hMWYyLTcyNTU2OTBmMTFlYyIsImNsaWVudFNlY3JldCI6InF6SmxQbGtIYkZJRmhrSmoiLCJvd25lck5hbWUiOiJTdXJlbmRlciBzaW5naCIsIm93bmVyRW1haWwiOiJzaW5naHN1cmVuZGVyMjgyMzFAZ21haWwuY29tIiwicm9sbE5vIjoiNzMwNDEwMTAxMDE4In0.vfLEHhR0kJJP4xBy4Cil6-6CGgvnV-2RZr1LvYTcopY", // Replace with actual token
        "Content-Type": "application/json",
      },
    });

    res.json(response.data); 
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Error fetching comments",
      error: error.response?.data || error.message,
    });
  }
});


app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
