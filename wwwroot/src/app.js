export class App {

    configureRouter(config, router) {
        this.router = router;

        config.map([
            { route: ["", "search"], moduleId: "customers/search", title: "Search", nav: true },
            { route: "customer/:id", moduleId: "customers/customer", title: "Customer", nav: false, name: "customer" },
            { route: "about", moduleId: "about/about", title: "About", nav: true }
        ]);
    }
}