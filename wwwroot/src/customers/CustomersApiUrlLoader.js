import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

let url = null;
let urlLoaded = false;

@inject(HttpClient)
export class CustomersApiUrlLoader {
    constructor(httpClient) {
        this.http = httpClient;
    }

    getUrl() {
        if (!urlLoaded) {
            return this.http.get("/api/environmentVariables/RUBICON_API_ENDPOINT")
                .then(response => {
                    url = response.content.value;
                    urlLoaded = true;

                    return url;
                })
                .catch(err => {
                    urlLoaded = true;

                    console.log(err.content);
                });
        } else {
            if (url != null)
                return Promise.resolve(url);
            else
                return Promise.reject("Url")
        }
    }
}