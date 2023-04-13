  import { ClienteService } from './../../services/clientes.service';
  import { ICliente } from './../../interfaces/clientes';
  import { Component } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-cadastrar-atualizar-clientes',
    templateUrl: './cadastrar-atualizar-clientes.component.html',
    styleUrls: ['./cadastrar-atualizar-clientes.component.css']
  })
  export class CadastrarAtualizarClientesComponent {

    clienteForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      rua: new FormControl('', Validators.required),
      numero: new FormControl(0, Validators.required),
      cep: new FormControl('', Validators.required),
      rendimentoMensal: new FormControl(0, Validators.required)
    });

    cpfCliente = '';

    constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(){
      this.cpfCliente = String(this.route.snapshot.paramMap.get('id'));

      // if(this.cpfCliente !== null){
      //   this.editar();
      // } else {
      //   this.cadastrar();
      // }

      if((this.cpfCliente !== null)){
        this.clienteService.buscarClienteCpf(this.cpfCliente).subscribe((cliente: ICliente) => {
          this.clienteForm.setValue({
            nome: cliente.nome,
            cpf: cliente.cpf,
            telefone: cliente.telefone,
            rua: cliente.rua,
            numero: cliente.numero || null,
            cep: cliente.cep,
            rendimentoMensal: cliente.rendimentoMensal || null

          })
        })
      }
    }

    cadastrar() {
      const cliente: ICliente = this.clienteForm.value as ICliente;
      this.clienteService.cadastrarCliente(cliente).subscribe(result => {
          Swal.fire(
            'Tudo certo!',
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
          })
      }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo deu errado! Verifique o erro no console (Ou no Back End).'
          })
          console.error(error);
      })
    }

    editar() {
      const cliente: ICliente = this.clienteForm.value as ICliente;
      this.clienteService.editarCliente(this.cpfCliente.toString(), cliente).subscribe(result => {
        Swal.fire(
          'Edição relaizada com sucesso!',
          'success'
        );
        this.router.navigate(['/clientes']);
      }, error => {
        Swal.fire({
          icon: 'error',
          text: 'Erro ao editar!'
        })

        console.error(error);
      })
    }
  }
