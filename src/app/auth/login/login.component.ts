import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuariosService } from '../../services/usuarios.service';


declare const google:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {

  @ViewChild('googleBtn') googleBtn!:ElementRef


  public loginForm = this.fb.group({
    email:[localStorage.getItem('email') || '',[Validators.required]],
    password:['123456',[Validators.required, Validators.minLength(6)]],
    remember:[false]
  })

  constructor(private router: Router,
              private fb:FormBuilder,
              private usuarioService:UsuariosService,
              public _ngZone:NgZone) { }
  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.googleInit()
  }

googleInit(){
  google.accounts.id.initialize({
    client_id: '926834542305-1004jk03ktqqo2k7d1kf3kt18jksml56.apps.googleusercontent.com',
    callback: (response:any)=>this.handleCredentialResponse(response)
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }  // customization attributes
  );
}

handleCredentialResponse(response:any){
        console.log("Encoded JWT ID token: " + response.credential);
        this.usuarioService.loginGoogle(response.credential).subscribe(resp =>{
         this._ngZone.run(()=> this.router.navigate(['/pages/dashboard']))
        })

}


  login(){
    this.usuarioService.login(this.loginForm.value)
      .subscribe({
        next:resp =>{
          if(this.loginForm.get('remember')?.value) localStorage.setItem('email',this.loginForm.get('email')?.value!)
          else localStorage.removeItem('email')
        },
        error:err => Swal.fire('Error!',err.error.msg,'error')
      })
    this.router.navigate(['/pages/dashboard'])
  }

}
