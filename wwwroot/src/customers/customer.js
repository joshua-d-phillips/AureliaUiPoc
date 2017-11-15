import { inject } from "aurelia-framework";
import { CustomerData } from "./customerData";

@inject(CustomerData)
export class Customer {
    constructor(customerData) {
        this.customerData = customerData;
        this.hasCustomer = false;
    }

    activate(params) {
        return this.customerData.getCustomer(params.id)
            .then(customer => {
                this.customer = customer;
                this.hasCustomer = true;
            })
            .catch(err => {
                this.customer = null;
                this.hasCustomer = false;
            });
    }
}