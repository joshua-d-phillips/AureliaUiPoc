import { inject } from "aurelia-framework";
import { CustomerData } from "./customerData";

@inject(CustomerData)
export class Customer {
    constructor(customerData) {
        this.customerData = customerData;
    }

    activate(params) {
        return this.customerData.getCustomer(params.id)
            .then(customer => {
                this.customer = customer
            });
    }
}