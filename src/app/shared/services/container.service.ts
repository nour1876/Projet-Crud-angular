import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Container } from '../Models/Container.model';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private http:HttpClient) { }
  addContainer(container:Container){
    return this.http.post("http://localhost:8000/api/container",container);
}
updateContainer(container_id: any,container:Container){
    return this.http.put("http://localhost:8000/api/container/"+container_id,container);
    
}
deleteContainer(container_id:any){
  return this.http.delete("http://localhost:8000/api/container/"+container_id);

}
getContainerByUserId(user_id: any){
  return this.http.get("http://localhost:8000/api/container/" + user_id);
}

}
