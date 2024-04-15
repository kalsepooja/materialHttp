import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postUrl = `${environment.baseUrl}/posts.json`;
  
  private newPostSub$ : Subject<Ipost> = new Subject<Ipost>();
  newPostSubObs$ : Observable<Ipost> = this.newPostSub$.asObservable();

  private updatePostSub$ : Subject<Ipost> = new Subject<Ipost>();
  updatePostObs$ : Observable<Ipost> = this.updatePostSub$.asObservable();

 private deletePostSub$ : Subject<string>  = new Subject<string>();
 deletePostSubObs$ : Observable<string> = this.deletePostSub$.asObservable()
  
  constructor(
    private _http: HttpClient
  ) { };
  

  fetchAllPosts(): Observable<any>{
    // console.log(this.postUrl);

    return this._http.get<any>(this.postUrl)
    
              .pipe(
                map((res: any) => {
                  let postArr: Array<Ipost> = [];
                  for(const key in res){
                    postArr.push({...res[key], id: key})
                  }
                  return postArr
                })
              )
  }

  createPost(post: Ipost): Observable<any>{
    return this._http.post(this.postUrl, post)
  };

  updatePost( updatePost: Ipost): Observable<Ipost>{
    let updateUrl = `${environment.baseUrl}/posts/${updatePost.id}.json`
   return this._http.patch<Ipost>(updateUrl, updatePost)
  }

  removePost(id: string):Observable<any>{
    let deletUrl = `${environment.baseUrl}/posts/${id}.json`;
    return this._http.delete(deletUrl)

  };

  sendNewPost(post: Ipost){
    this.newPostSub$.next(post)
  }

  sendUpdatedPost(post: Ipost){
    this.updatePostSub$.next(post)
  }

  sendDeleteId(id: string){
    this.deletePostSub$.next(id)
  }







}
