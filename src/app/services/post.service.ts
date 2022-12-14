import { Injectable } from '@angular/core';
import {Post} from "../models/post.model";
import {count, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts');
  }

  newPost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:3000/posts',post);
  }

  deletePost(idPost: number): Observable<Post> {
    return this.http.delete<Post>('http://localhost:3000/posts/' + idPost);
  }


}
