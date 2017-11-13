import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationRules, ValidationControllerFactory, validateTrigger } from "aurelia-validation";

@inject(Router, ValidationControllerFactory)
export class Search {
    constructor(router, validationController) {
        this.id = "7311811066";

        this.router = router;

        ValidationRules
            .ensure(search => search.id)
            .required()
            .matches(/^\d+$/)
            .on(this);
        
        this.validationController = validationController.createForCurrentScope();
        this.validationController.validateTrigger = validateTrigger.manual;
    }

    activate() {
    }

    search() {
        this.validationController.validate().then(result => {
            if (result.valid) {
                let url = this.router.generate("customer", { id: this.id });

                this.router.navigate(url);
            }
        });
    }
}