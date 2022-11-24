import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {PostService} from "../services/post.service";
import {Post} from "../models/post.model";
import {CommentService} from "../services/comment.service";
import {CommentPost} from "../models/commentPost";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:any) {
    console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  constructor(private postService: PostService, private commentService: CommentService, private route: Router, private authService: AuthService, public userService: UserService,public domsanitizer: DomSanitizer) { }
  newPost: Post = new Post();
  posts!: Post[];
  commentsPost!: CommentPost[];
  newComment: CommentPost = new CommentPost();
  user: User = new User();
  name!: String;
  //showDeleteButton: boolean = true;

  ngOnInit(): void {
    this.getPosts();
  }

  newCommentForm = new FormControl('', {nonNullable:true});

  newPostFormText = new FormControl('', {nonNullable:true});
  newPostFormTitle = new FormControl('', {nonNullable:true});

  getName(authorId: number) {
    this.userService.getNameById(authorId).subscribe((name)=>{
      return name;
    });
  }

  showDeleteButton(author_id: number){
    this.user = this.authService.getUser();
    if(author_id === this.user.id){
      return true;
    } else {
      return false;
    }
  }

  getPosts(){
    this.postService.getPosts().subscribe((posts:Post[]) => {
      this.posts = posts;
    })
  }

  openComments(postId: number): void {
    this.commentService.getCommentsForPostById(postId).subscribe((commentPost:CommentPost[]) => {
      this.commentsPost = commentPost;
    });
  }

  addComment(postId:number): void {
    this.newComment.text = this.newCommentForm.value;
    this.newComment.name = this.authService.getUser().name;
    this.newComment.post_id = postId;
    this.newComment.author_id = this.authService.getUser().id;
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

  deletePost(idPost: number){
    this.postService.deletePost(idPost).subscribe(()=> {
      this.getPosts();
    });
  }

}
