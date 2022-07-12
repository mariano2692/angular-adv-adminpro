import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(archivo:File, tipo:string, id:string){
    try {
      const url = `${base_url}/upload/${tipo}/${id}`
      const formData:FormData = new FormData();
      formData.append('imagen',archivo)
      const resp = await fetch(url,{
        method:'PUT',
        headers:{
          'x-token':localStorage.getItem('token') || ''
        },
        body:formData
      });
      const data = await resp.json();
      if(data.ok) return data.nombreArchivo
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
