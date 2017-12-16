import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MyPics} from '../resources/data/mypics';   
import {Pics} from '../resources/data/pics';  
import { AuthService } from 'aurelia-auth';    

@inject(Router, AuthService, MyPics, Pics)
export class List {

  constructor(router,auth,mypics, pics) {
    this.router = router;
    this.mypics = mypics;
    this.pics = pics;
    this.auth = auth;
    this.message ='List';
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.showList = 'mypicList';

  }

  async activate(){
    await this.mypics.getUserMypics(this.user._id);
}

createMypic(){   
    this.mypicObj = {
        mypics: "",
        description: "",
        dateCreated: new Date(),
        userId: this.user._id,
        // priority: this.priorities[0]
    }
    // this.showList = false;      
    this.showList = 'mypicForm'; 
}

createPics (){
    this.mypicObj ={
        userId: this.user._id,
        Id: this.selectedpic
    }
    this.showList = 'picsForm';
}

editMypic(mypic){
            this.mypicObj = mypic;
            // this. showList = false;
            this. showList = 'mypicForm';
        }

editPics(mypic){
    this.mypicObj = mypic;
    this.showList = 'picsForm';
}        

deleteMypic(mypic){
            this.mypics.deleteMypic(mypic._id);
        }

        deletePics(mypic){
            this.pics.deletePic(mypic._id);
        }

    // completeMypic(mypic){
    //         mypic.completed = !mypic.completed;
    //         this.mypicObj = mypic;
    //         this.saveMypic();
    //     }

    //  toggleShowCompleted(){
    //         this.showCompleted = !this.showCompleted;
    //     }
      
    changeFiles(){
              this.filesToUpload = new Array(); 
              this.filesToUpload.push(this.files[0]);
            }
    
    removeFile(index){
                this.filesToUpload.splice(index,1);
            }
               

async saveMypic(){
    if(this.mypicObj){       
        let response = await this.mypics.save(this.mypicObj);
        if(response.error){
            alert("There was an error creating the MyPics");
        } else {
              var mypicId = response._id;
                            if(this.filesToUpload && this.filesToUpload.length){
                                await this.mypics.uploadFile(this.filesToUpload, this.user._id, mypicId);
                                this.filesToUpload = [];
                            }                     
        }
        this.showList = 'mypicList';
    }
}

async savePics(){
    if(this.mypicObj){       
        let response = await this.pics.save(this.mypicObj);
        if(response.error){
            alert("There was an error creating the MyPics");
        } else {
              var mypicId = response._id;
                            if(this.filesToUpload && this.filesToUpload.length){
                                await this.pics.uploadFile(this.filesToUpload, this.user._id, mypicId);
                                this.filesToUpload = [];
                            }                     
        }
        this.showList = 'picsList';
    }
}

async showPics (mypic){
    this.selectedpic = mypic._id;
    await this.pics.getPics(mypic._id)
    this.showList ='picsList';
}

back(){
    this.showList='mypicList';
}

backPics(){
    this.showList='picsList';
}

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
  }
}