import { http, HttpResponse } from "msw";
import { Post } from "../hooks/usePosts";
const url = "http://localhost:4000/posts";

export let posts: Post[] = [
  {
    id: "1",
    title: "First Post",
    likes: 5,
  },
  {
    id: "2",
    title: "Second Post",
    likes: 10,
  },
];

export const handlers = [
  http.get(url, async () => {
    return HttpResponse.json(posts);
  }),
  http.post(url, async ({ request }) => {
    const newPost = (await request.json()) as Post;
    newPost.id = Date.now().toString();
    posts.push(newPost);
    return HttpResponse.json(newPost, { status: 201 });
  }),
  http.put(`${url}/:id`, async ({ params, request }) => {
    const { id } = params;
    const updatePost = (await request.json()) as Post;
    const index = posts.findIndex((post) => post.id === id);
    posts[index] = updatePost;
    return HttpResponse.json(updatePost, { status: 200 });
  }),
];
