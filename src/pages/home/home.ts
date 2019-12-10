import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  foto:any;
  fotoB64:any;
  data:any;
  users: any;
  fruta: any;
  puntaje: any;
  fotoImp:any;
  frutaYPuntaje:any;
  jsonOriginal:any;
  entroIf:any;
  tokenInput:string = "";
  isenabled:boolean = false; 
  checkDisabled:boolean = false;

  constructor(public navCtrl: NavController, private camera: Camera, private transfer: FileTransfer, private loadingCtrl:LoadingController,public restProvider: RestProvider) {

  }

  checkEvent() {
    if(this.checkDisabled){
      this.isenabled = true;
    } else {
      this.isenabled = false;
    }
  }

  sacarFoto(){
    this.fotoB64 = "";
    this.fruta = "";
    this.puntaje = "";
    this.frutaYPuntaje = "";
    this.jsonOriginal = "";
    this.entroIf = "";
    this.frutaYPuntaje = "";

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.fotoB64 = imageData;
      console.log(imageData);
    }, (err) => {
    });
  }

  abrirGaleriaImagen() {
    this.fotoB64 = "";
    this.fruta = "";
    this.puntaje = "";
    this.frutaYPuntaje = "";
    this.jsonOriginal = "";
    this.entroIf = "";
    this.frutaYPuntaje = "";

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.fotoB64 = imageData;
      console.log(imageData);
    }, (err) => {
    });
  }

  reconocerImagen(){
    console.log(this.tokenInput);
    this.data = {
      "payload": {
        "image": {
          "imageBytes": ""
        }
      }
    }

      this.data.payload.image.imageBytes = this.fotoB64;
      this.fotoImp = this.data.payload.image.imageBytes;


     this.restProvider.postDatos(this.data, this.tokenInput).subscribe(
      (data) => {    
        
        this.jsonOriginal = JSON.stringify(data);
        if(data =="{}"){
          this.entroIf = "esta vacio";
            this.frutaYPuntaje = "No se pudo indentificar la fruta";
            console.log("esta vacio");
        }else {
          this.entroIf = "no esta vacio";
          this.fruta = data["payload"][0].displayName;
          this.puntaje = data["payload"][0].classification.score;
          this.frutaYPuntaje = this.fruta +":"+this.puntaje;
        }

      },
      (error) =>{
        this.frutaYPuntaje = "No se pudo indentificar la fruta";
        console.log(error);
      });

  }
}

