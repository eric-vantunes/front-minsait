import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CadastrarAtualizarClientesComponent } from './pages/cadastrar-atualizar-clientes/cadastrar-atualizar-clientes.component';
import { DeletarClienteComponent } from './pages/deletar-cliente/deletar-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'clientes/lista', component: ClientesComponent
  },
  {
    path: 'clientes/cadastrar', component: CadastrarAtualizarClientesComponent
  },
  {
    path: 'clientes/editar/:id', component: CadastrarAtualizarClientesComponent
  },

  { path: 'clientes/delete/:id', component: DeletarClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
