import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";
import { CustomersApiUrlLoader } from "./CustomersApiUrlLoader";


@inject(HttpClient, CustomersApiUrlLoader)
export class CustomerData {
    constructor(httpClient, customersApiUrlLoader) {
        this.http = httpClient;
        this.urlLoader = customersApiUrlLoader;
    }

    getCustomer(customerId) {
        return this.urlLoader.getUrl()
            .then(response => { return response; })
            .then(response => this.http.get(`${response}/${customerId}`))
            .then(response => { return response.content; });
    }
}