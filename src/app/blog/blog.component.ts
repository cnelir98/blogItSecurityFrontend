import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostService} from "../services/post.service";
import {Post} from "../models/post.model";
import {CommentService} from "../services/comment.service";
import {CommentPost} from "../models/commentPost";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  constructor(private postService: PostService, private commentService: CommentService, private route: Router) { }
  newPost: Post = new Post();
  posts!: Post[];
  commentsPost!: CommentPost[];
  newComment: CommentPost = new CommentPost();

  ngOnInit(): void {
    this.getPosts();
  }

  newCommentForm = new FormControl('', {nonNullable:true});

  newPostFormText = new FormControl('', {nonNullable:true});
  newPostFormTitle = new FormControl('', {nonNullable:true});

  getPosts(){
    alert('XSS');
    this.postService.getPosts().subscribe((posts:Post[]) => {
      this.posts = posts;
    })
  }

  openComments(postId: number): void {
    this.commentService.getCommentsForPostById(postId).subscribe((commentPost:CommentPost[]) => {
      this.commentsPost = commentPost;
      console.log(this.commentsPost);
    });
  }

  addComment(postId:number): void {
    this.newComment.text = this.newCommentForm.value;
    this.newComment.author = 'ichbins';
    this.newComment.post_id = postId;

    this.commentService.postComment(this.newComment).subscribe((response) => {
      this.openComments(postId);
    });
    this.newCommentForm.reset();
  }

  addNewPost(): void {
    this.newPost.author_id = 1;
    this.newPost.author = 'testUser2';
    this.newPost.text = this.newPostFormText.value;
    this.newPost.title = this.newPostFormTitle.value;

    this.postService.newPost(this.newPost).subscribe((response) => {
      console.log(response);
      this.getPosts();
    });

    this.newPostFormText.reset();
    this.newPostFormTitle.reset();
  }

  logOut(): void {
    this.route.navigate(["login"]).then(()=> {
      localStorage.removeItem('token');
    });
  }

}
