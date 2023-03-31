import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { today, thisWeek, thisMonth, Post } from "../post"
import { NewUser, User } from "../users"

const app = express()
app.use(cors())
app.use(bodyParser.json())

const allPosts: Post[] = [today, thisWeek, thisMonth]
const allUsers: User[] = []

app.get("/posts", (req, res) => {
  res.json(allPosts)
})

app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(post)
  res.json(allPosts)
})

app.post<{}, {}, NewUser>("/users", (req, res) => {
  const newUser = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(newUser)
  const { password, ...rest } = newUser
  res.json(rest)
})

app.listen(8000, () => {
  console.log("Listening on port 8000")
})
