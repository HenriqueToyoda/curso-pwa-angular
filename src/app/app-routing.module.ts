import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroSeguroComponent } from './components/cadastro-seguro/cadastro-seguro.component';
import { ListarSeguroComponent } from './components/listar-seguro/listar-seguro.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cadastro'},
  {path: 'cadastro', component: CadastroSeguroComponent},
  {path: 'listar', component: ListarSeguroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
