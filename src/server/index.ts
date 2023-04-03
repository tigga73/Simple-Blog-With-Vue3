import express, { Request, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import jsonwebtoken from "jsonwebtoken"
import { today, thisWeek, thisMonth, Post } from "../post"
import { NewUser, User } from "../users"

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

const allPosts: Post[] = [today, thisWeek, thisMonth]
const allUsers: User[] = []

const SECRET = "my-secret"
const COOKIE = "vuejs-jwt"

function authenticate(id: string, req: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: "vuejs-course",
    expiresIn: "30 days",
  })
  res.cookie(COOKIE, token, { httpOnly: true })
}

app.get("/current-user", (req, res) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jsonwebtoken.verify(token, SECRET) as { id: string }
    res.json({ id: result.id })
  } catch (e) {
    res.status(404).end()
  }
})

app.get("/posts", (req, res) => {
  res.json(allPosts)
})

app.post("/logout", (req, res) => {
  res.cookie(COOKIE, "", { httpOnly: true })
  res.status(200).end()
})

app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }

  allPosts.push(post)
  res.json(allPosts)
})

app.post<{}, {}, NewUser>("/login", (req, res) => {
  const targetUser = allUsers.find((x) => x.username === req.body.username)

  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end()
  } else {
    authenticate(targetUser.id, req, res)
    res.status(200).end()
  }
})

app.post<{}, {}, NewUser>("/users", (req, res) => {
  const newUser = { ...req.body, id: (Math.random() * 100000).toFixed() }

  allUsers.push(newUser)
  authenticate(newUser.id, req, res)
  const { password, ...rest } = newUser
  res.json(rest)
})

app.listen(8000, () => {
  console.log("Listening on port 8000")
})
