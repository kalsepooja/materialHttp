import { Component, Inject, OnInit, inject, resolveForwardRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '../../service/posts.service';
import { Ipost } from '../../model/posts';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postform! : FormGroup;
  isEditableMode: boolean = false;
  postObj! : Ipost;

  constructor(
    private _dialogRef: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) getData: any,

    private _Postservice : PostsService,
    private _snackBarService: SnackBarService
  ) {
    this.createForm()
    console.log(getData);
    if(getData){
      this.postObj = getData;
      this.isEditableMode = true;
      this.postform.patchValue(getData)
    }
   }

  ngOnInit(): void {
  }

  createForm(){
    this.postform = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
      userId: new FormControl(null, [Validators.required]),
    })
  }

  onPostAdd(){
    if(this.postform.valid){
      let post = this.postform.value;
      // console.log(post);
      this._Postservice.createPost(post)
        .subscribe(res => {
          // console.log(res);
          this._Postservice.sendNewPost(post);
          this._snackBarService.openSnackBar(`Post ${res.title} is added Successfully.`)
          this.postform.reset();
          this._dialogRef.close()
        })
    }
  };

  onUpdate(){
    if(this.postform.valid){
      let updatePost = {...this.postform.value, id : this.postObj.id}
      console.log(updatePost);
      this._Postservice.updatePost(updatePost)
        .subscribe(res => {
          console.log(res);
          this._Postservice.sendUpdatedPost(res)
          this._snackBarService.openSnackBar(`Post ${res.title} is Updated Successfully.`)
          this._dialogRef.close();
        })
    }
  }






  

}
