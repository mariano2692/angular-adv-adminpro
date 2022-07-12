import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.baseUrl
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined , tipo:'usuarios'|'medicos'|'hospitales'): string {
    if(!img) return `${base_url}/upload/${tipo}/noimg`
    if(img.includes('https')) return img
    return `${base_url}/upload/${tipo}/${img}`
  }

}
