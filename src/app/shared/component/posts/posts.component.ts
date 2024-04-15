import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Ipost } from '../../model/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postArr! : Array<Ipost>
  constructor(
    private _postService: PostsService,
    public _dialouge: MatDialog,
  ) { }

  ngOnInit(): void {
      this._postService.fetchAllPosts()
      .subscribe(res => {
        this.postArr = res;
      })
      this._postService.newPostSubObs$
        .subscribe(post => {
          this.postArr.push(post)
        })

      this._postService.updatePostObs$
          .subscribe(res => {
            console.log(res);
            let getIndex = this.postArr.findIndex(post => post.id === res.id)
            this.postArr[getIndex] = res;
          })
      this._postService.deletePostSubObs$
        .subscribe(id => {
          let getIndex = this.postArr.findIndex(post => post.id === id)
          this.postArr.splice(getIndex)
        })    
  };

onAddPost(){
  let dialogconfig = new MatDialogConfig();
  dialogconfig.disableClose = true;
  dialogconfig.width = '600px';
  dialogconfig.data = 'some data for patch values';

  const dialogRef = this._dialouge.open(PostFormComponent, dialogconfig)
}


}
