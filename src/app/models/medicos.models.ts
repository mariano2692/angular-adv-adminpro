import { environment } from '../../environments/environment';
const base_url = environment.baseUrl


interface _Usuario{
    nombre:string
    _id:string
    img?:string
}
interface _Hospital{
    nombre:string
    _id:string
    img?:string
}


export class Medicos{
    constructor(
        public nombre:string,
        public usuario?: _Usuario,
        public hospital?: _Hospital,
        public uid?:string,
        public img?:string
    ){}
}