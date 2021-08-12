import baseUrl from "../utils/baseUrl";
import https from "./httpRequests";

//getting all the posts
export const GetAllPosts = () => https.get(`${baseUrl}/posts`);

//getting single post details
export const GetPostDetailsById = ({ id }) =>
  https.get(`${baseUrl}/posts/${id}`);

//editing  single posts
export const UpdatePost = ({ id, data }) =>
  https.put(`${baseUrl}/posts/${id}`, data);

//deleting  single posts
export const DeletePost = ({ id }) => https.put(`${baseUrl}/posts/${id}`);
