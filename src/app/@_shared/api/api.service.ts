import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
/** Сервис для работы с api */
export class ApiService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) { }

  /**
   * Отправляет запрос на сервер (Если параметры не в нужном формате, то в консоль пишется "Не верный формат данных.")
   * @param Url Адресс запроса без основного хоста (без того, который записывается в конфиг)
   * @param Params Параметры запроса
   */
  SendRequest<T>(Url: string, Params: string | number | boolean | Array<string | number | boolean> = null) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (Params === null) {
      return this.http.get<T>(this.appConfigService.Get("apiBaseUrl") + Url);
    }
    else if (typeof Params === "number" || typeof Params === "boolean" || typeof Params === "string") {
      return this.http.post<T>(this.appConfigService.Get("apiBaseUrl") + Url, JSON.stringify(Params), httpOptions);
    }
    else if (Params instanceof Array) {
      let param = {};
      Params.forEach(function (item) {
        if (typeof item === "object") {
          param[Object.keys(item)[0]] = Object.values(item)[0];
        }
      });
      return this.http.post<T>(this.appConfigService.Get("apiBaseUrl") + Url, JSON.stringify(param), httpOptions);
    }
    else {
      console.log("Не верный формат данных.");
    }
  }
}
