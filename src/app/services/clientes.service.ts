import { ICliente } from './../interfaces/clientes';
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  endpoint = 'clientes';
  api= environment.api;

  constructor(private http: HttpClient) {}

  cadastrarCliente(cliente: ICliente){
    return this.http.post(`${this.api}/${this.endpoint}`, cliente);
  }

  buscarClienteCpf(cpf: string) {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`);
  }

  listarClientes(){
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`);
  }

  editarCliente(cpf: string, cliente: ICliente){
    return this.http.put<ICliente>(`${this.api}/${this.endpoint}/${cpf}`, cliente);
  }

  deletaCliente(cpf: string){
    return this.http.delete<ICliente>(`${this.api}/${this.endpoint}/${cpf}`);
  }
}
