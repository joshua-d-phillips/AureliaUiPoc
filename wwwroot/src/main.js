export function configure(aurelia) {

    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin("aurelia-validation")
        .feature("./src/resources");

    aurelia.start().then(a => a.setRoot("./src/app"));
}