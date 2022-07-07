import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Container } from '../shared/Models/Container.model';
import { ContainerService } from '../shared/services/container.service';
declare var jQuery:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId!: number;
  user: any;
  containers!: Container[];
  container!:Container ;
  form: any;
  title!: string;
  deleteContainerId!:number;
  constructor(private containerService: ContainerService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') == null) {
      jQuery('.login').modal('show');
    }

    let v=localStorage.getItem('user')
    if (v!==null){
    this.user = JSON.parse(v);
    this.userId=this.user.userInfo.id;
    this.getContainers(this.userId);
    
  }
  this.initializeForm();
   this.container = this.form.value;
  }
  getContainers(user_id: number){
    this.containerService.getContainerByUserId(user_id).subscribe((data:any) => {
      this.containers = data;
    })

  }
  initializeForm() {
    this.form= new FormGroup({
      user_id:new FormControl(this.userId,[Validators.required]),
      poids: new FormControl(0,[Validators.required]),
      port_depart: new FormControl('',[Validators.required]),
      port_arrive:new FormControl('',[Validators.required]),
      time_depart:new FormControl(new Date(),[Validators.required]),
      time_arrive:new FormControl(new Date(),[Validators.required]),
    });
  }
  public openAddContainerModal(){
    this.initializeForm();
    this.container = this.form.value;
    this.title = "Add Container";
    jQuery('.modal-add-container-form').modal('show');
  }
  closeModal(modalClass:string){
    jQuery(modalClass).modal('hide');
  }
  Add(){
    //this.container=this.form.value;
    this.containerService.addContainer(this.form.value).subscribe(data => {
      this.closeModal('.modal-add-container-form');
    this.getContainers(this.userId);
    });
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(["/login"]);

  }
  openUpdateContainerModal(container: Container) {
    this.title = "Update Container";
    this.container = container;
    jQuery('.modal-add-container-form').modal('show');

  }
  updateContainer(){
    this.containerService.updateContainer(this.container.container_id,this.form.value).subscribe(data=>{
      this.closeModal('.modal-add-container-form');
      this.getContainers(this.userId);
    });
    

  }
deleteContainer(){
  this.containerService.deleteContainer(this.deleteContainerId).subscribe(data=>{
    this.getContainers(this.userId);
    this.closeModal('.delete-container');
  })
}
openDeleteContainerModal(container_id:number){
  this.deleteContainerId = container_id;
  jQuery('.delete-container').modal('show');
}

redirectToLogin() {
  this.router.navigate(["/login"]);
  this.closeModal(".login")
}
}

