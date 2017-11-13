import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

let baseUrl = "http://localhost:42000/api/v2/customers";

@inject(HttpClient)
export class CustomerData {
    constructor(httpClient) {
        this.http = httpClient;
    }

    getCustomer(customerId) {
        return this.http.get(`${baseUrl}/${customerId}`)
            .then(response => {
                return response.content;
            });
    }

    searchCustomer(terms) {
        var request = this.http.createRequest();

        request.asPut()
            .withUrl(baseUrl)
            .withHeader("Accept", "application/json")
            .withHeader("Content-Type", "application/json")
            .withContent(terms);

        return request.send().then(response => response.content);
    }
}