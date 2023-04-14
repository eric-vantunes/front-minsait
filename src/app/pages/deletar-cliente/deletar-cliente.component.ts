import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/clientes';
import { ClienteService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deletar-cliente',
  templateUrl: './deletar-cliente.component.html',
  styleUrls: ['./deletar-cliente.component.css']
})
export class DeletarClienteComponent {

  clientes: ICliente[] = [];
  constructor(private ClienteService: ClienteService, private route: ActivatedRoute, private router: Router){}

  cpfCliente = '';
  ngOnInit(){
    this.ClienteService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter a situação!",
      icon: 'warning',
      confirmButtonColor: '#A9D46F',
      cancelButtonColor: '#BB2D3B',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true
    }).then((result) => {
      if(result.isConfirmed) {
        this.cpfCliente = String(this.route.snapshot.paramMap.get('id'));
        this.ClienteService.deletaCliente(this.cpfCliente).subscribe(result => {
          Swal.fire(
            'Seu cadastro foi excluído com sucesso!',
            'success'
          );
            this.clientes = this.clientes.filter(cliente => String(cliente.id) !== this.cpfCliente);

          this.router.navigate(['/clientes'])
        }, error => {
          Swal.fire({
            icon: 'error',
            text: 'Erro ao tentar deletar!'
          })
          console.error(error);
        })
        setTimeout(function() {
          window.location.reload()
        })
      }
      this.router.navigate(['/clientes/lista']);
    });
  }

}
