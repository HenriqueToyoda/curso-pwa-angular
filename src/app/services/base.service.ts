import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import Dexie from 'dexie';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends {id: string}> {

  private db!: Dexie;
  private table!: Dexie.Table<T, any>;
  
  protected http!: HttpClient;
  protected onlineOfflineService!: OnlineOfflineService;

  constructor(
    protected injector: Injector,
    protected nomeTabela: string,
    protected urlApi: string
  ) { 
    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);

    this.ouvirStatusConexao(); 
    this.iniciarIndexedDb();
  }

  
  private iniciarIndexedDb(){
    this.db = new Dexie('db-seguros');
    this.db.version(1).stores({
      [this.nomeTabela]: 'id'
    });
    this.table = this.db.table(this.nomeTabela);
  }

  private salvarAPI(tabela: T){
    this.http.post(this.urlApi, tabela)
    .subscribe(
      () => alert('tabela foi cadastrado com sucesso!'),
      (err) => console.log('Erro ao cadastrar tabela!')
    );
  }

  private async salvarIndexedDb(tabela: T){
    
    try{
      await this.table.add(tabela);
      const todostabelas: T[] = await this.table.toArray();
      console.log('tabelas cadastrados',todostabelas);
    }catch(error){
      console.log('tabelas não cadastrados', error);
    }
  }

  private async enviarIndexedDbParaApi(){
    const todostabelas: T[] = await this.table.toArray();

    for (const tabela of todostabelas){
      this.salvarAPI(tabela);
      await this.table.delete(tabela.id);
      console.log(`tabela com o id ${tabela.id}, foi deletado com sucesso`)
    }
  }

  public cadastrar(tabela: T){
    if (this.onlineOfflineService.isOnline){
      this.salvarAPI(tabela);
    }else{
      this.salvarIndexedDb(tabela);
    }
  }
  
  listar(): Observable<T[]>{
    return this.http.get<T[]>(this.urlApi);
  }

  private ouvirStatusConexao(){
    this.onlineOfflineService.statusConexao
      .subscribe(online =>{
        if (online){
          this.enviarIndexedDbParaApi();
        }
        else{
          console.log('offline')
        }
      })
  }
}
