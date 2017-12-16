import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Pics {
    constructor(data) {
                this.data = data;
                this.PIC_SERVICE = 'pics';
                this.picArray= [];
         }

         async getPics(id){
            let response = await this.data.get(this.PIC_SERVICE + "/" + id);
            if(!response.error && !response.message){
                this.picArray = response;
            }
        }         

async getUserPic(id){
    let response = await this.data.get(this.PIC_SERVICE + "/user/" + id);
    if(!response.error && !response.message){
        this.picArray = response;
    }
} 

async save(pic){
    if(pic){
    if(!pic._id){
    let serverResponse = await this.data.post(pic, this.PIC_SERVICE);
    if(!serverResponse.error){
        this.picArray.push(serverResponse);
    }
    return serverResponse;
        } else {
                let serverResponse = await this.data.put(pic, this.PIC_SERVICE + "/" + pic._id);
                return serverResponse;
            }
       }
    
    }

async deletePic(id){
    let serverResponse = await this.data.delete(this.PIC_SERVICE + "/" + id);
    if(!serverResponse.error){
        for(let i = 0; i < this.picArray.length; i++){
            if(this.picArray[i]._id === id){
                this.picArray.splice(i,1);
            }
        }
    }
}   

async uploadFile(files, userId, picId){
            let formData = new FormData();
          files.forEach((item, index) => {
        formData.append("file" + index, item);
            });
        let serverResponse = await this.data.uploadFiles(formData, this.PIC_SERVICE +"/upload/" + userId + "/" + picId);
        return serverResponse;
    }
    

    
}