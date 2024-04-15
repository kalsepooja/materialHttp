import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../model/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostsService } from '../../service/posts.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input() postObj! : Ipost
  constructor(
    private _matdialog: MatDialog,
    private _postService: PostsService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  };

  onPostEdit(){
    let matDailogConfig = new MatDialogConfig();
    matDailogConfig.width =  '500px';
    matDailogConfig.data =  this.postObj

    let MatDialogRef = this._matdialog.open(PostFormComponent, matDailogConfig)
  }

  onPostRemove(){
    const matDialog = this._matdialog.open(GetConfirmationComponent)

    matDialog.afterClosed()
      .subscribe(getConfirmation => {
        // console.log(getConfirmation);

        if(getConfirmation) {
          this._postService.removePost(this.postObj.id)
          .subscribe(res => {
            console.log(res);
            this._postService.sendDeleteId(this.postObj.id)
            this._snackBar.openSnackBar(`The Post ${this.postObj.title} is removed Successfully.`)
          })
        }else{
          return 
        }
        
      })
    // this._postService.removePost(this.postObj.id)
    //   .subscribe(res => {
    //     console.log(res);
    //     this._postService.sendDeleteId(this.postObj.id)
    //     this._snackBar.openSnackBar(`The Post ${this.postObj.title} is removed Successfully.`)
    //   })
  }



}
