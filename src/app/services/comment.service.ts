import { Injectable } from '@angular/core';
import {Observable, of,map} from "rxjs";
import {CommentPost} from "../models/commentPost";
import {Post} from "../models/post.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsForPostById(idPost:number): Observable<CommentPost[]> {
    return this.http.get<CommentPost[]>('http://localhost:3000/comments/post/' + idPost)
  }


  postComment(comment: CommentPost): Observable<CommentPost> {
    return this.http.post<CommentPost>('http://localhost:3000/comments', comment)
  }

}
