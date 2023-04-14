import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from '../../interfaces/clientes';
import { ClienteService } from '../../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar-cliente',
  templateUrl: './cadastrar-atualizar-clientes.component.html',
  styleUrls: ['./cadastrar-atualizar-clientes.component.css']
})

export class CadastrarAtualizarClientesComponent implements OnInit {

  clienteForm = new FormGroup({
    cpf: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    rua: new FormControl('', Validators.required),
    numero: new FormControl(0, Validators.required),
    cep: new FormControl('', Validators.required),
    rendimentoMensal: new FormControl(0, Validators.required)
  });

  cpfCliente = '';

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.cpfCliente = String(this.route.snapshot.paramMap.get('id'));

    if((this.cpfCliente !== 'null')) {
      this.clienteService.buscarClienteCpf(this.cpfCliente).subscribe((cliente: ICliente) => {
          this.clienteForm.setValue({
              cpf: cliente.cpf,
              nome: cliente.nome,
              telefone: cliente.telefone || null,
              rua: cliente.rua,
              numero: cliente.numero || 0,
              cep: cliente.cep,
              rendimentoMensal: cliente.rendimentoMensal,
          });
      });
    }

  }

  cadastrarOuEditar(): void {
    if(this.cpfCliente !== 'null') {
      this.editar();
    } else {
      this.cadastrar();
    }
  }

  cadastrar(): void {
    const cliente: ICliente = this.clienteForm.value as ICliente;
    this.clienteService.cadastrarCliente(cliente).subscribe(result => {
        Swal.fire(
          'Cadastro realizado com sucesso!',
          'success'
        );
        this.clienteForm.setValue({
          cpf: '',
          nome: '',
          telefone: null,
          rua: '',
          numero: 0,
          cep: '',
          rendimentoMensal: 0
        });
    }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado! Verifique se preencheu os campos corretamente.'
        });
        console.error(error);
    });
  }

  editar(): void {
    const cliente: ICliente = this.clienteForm.value as ICliente;
    this.clienteService.editarCliente(this.cpfCliente.toString(), cliente).subscribe(result => {
        Swal.fire(
          'Edição realizada com sucesso!',
          'success'
        );
        this.router.navigate(['/clientes']);
    }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado! Verifica se preencheu todos os campos.'
        });
        console.error(error);
    });
  }
}
