import { Component } from '@angular/core';
import { ICliente } from 'src/app/interfaces/clientes';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: ICliente[] = [];
  constructor(private ClienteService: ClienteService){}

  ngOnInit(){
    this.ClienteService.listarClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    })
  }

}
