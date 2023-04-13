import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { ClientesComponent } from '../app/pages/clientes/clientes.component';
import { CadastrarAtualizarClientesComponent } from '../app/pages/cadastrar-atualizar-clientes/cadastrar-atualizar-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeletarClienteComponent } from './pages/deletar-cliente/deletar-cliente.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ClientesComponent,
    CadastrarAtualizarClientesComponent,
    DeletarClienteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
