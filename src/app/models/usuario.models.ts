import { environment } from '../../environments/environment';

const base_url = environment.baseUrl

export class Usuario {
    constructor( 
        public nombre: string,
        public email: string,
        public role?: string,
        public google?: boolean,
        public img?: string,
        public uid?: string
        ){ }

        get imgUrl(){
           
            if(!this.img) return `${base_url}/upload/usuarios/noimg`
            if(this.img?.includes('https')) return this.img
            return `${base_url}/upload/usuarios/${this.img}`
         
           
        }
}