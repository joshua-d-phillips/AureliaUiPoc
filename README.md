# AureliaBasic

1. [Install .net core 2.0 SDK](https://www.microsoft.com/net/learn/get-started/windows)
1. [Install Node.js](https://nodejs.org/en/)
1. [Install Git client](https://desktop.github.com/)
1. Configure npm proxies
```
npm config set proxy http://"{user name:url encoded password}"@proxy.us.dell.com:80
npm config set https-proxy http://"{user name:url encoded password}"@proxy.us.dell.com:80
```
1. Set user environment variables 
 - **HTTP_PROXY** with value `http://"{user name:url encoded password}"@proxy.us.dell.com:80`
 - **HTTPS_PROXY** with value `http://"{user name:url encoded password}"@proxy.us.dell.com:80`
1. Install JSPM globally `npm install jspm -g`
1. Run the following commands
```
md app-folder-name
cd app-folder-name
dotnet new webapi
```
1. Run command `npm init`
 - accept all default settings
1. Run command `npm install jspm --save` to lock the local jspm version for this project
1. Run command `jspm init`
 - Enter following options accepting defaults for all but prompt "Enter server baseURL (public folder path) [./]"
```
Package.json file does not exist, create it? [yes]:
Would you like jspm to prefix the jspm package.json properties under jspm? [yes]:
Enter server baseURL (public folder path) [./]:wwwroot
Enter jspm packages folder [wwwroot\jspm_packages]:
Enter config file path [wwwroot\config.js]:
Configuration file wwwroot\config.js doesn't exist, create it? [yes]:
Enter client baseURL (public folder URL) [/]:
Do you wish to use a transpiler? [yes]:
Which ES6 transpiler would you like to use, Babel, TypeScript or Traceur? [babel]:
```
1. Run command `jspm install aurelia-framework aurelia-bootstrapper`
 - Ran in to this bug https://github.com/aurelia/skeleton-navigation/issues/281
  - Solved by running command `jspm install aurelia-pal-browser`
1. Open .net project in VS2017 and add nuget package `Microsoft.AspNetCore.StaticFiles`
1. Edit Startup.cs file by adding statement `app.UseStaticFiles ();` to the **Configure** method
1. Modify config.js file by adding settings `es7.decorators` and `es7.classProperties` in the **babelOptions** section to take advantage of new ECMAScript functionality like this
```
System.config({
    baseURL: "/",
    defaultJSExtensions: true,
    transpiler: "babel",
    babelOptions: {
        "optional": [
            "runtime",
            "optimisation.modules.system",
            "es7.decorators",
            "es7.classProperties"
        ]
    },
    ...
}
```
1. Modify config.js file by adding `"*":"src/*.js"` in the **paths** section to tell Aurelia where to find scripts
```
System.config({
    ...,
    paths: {
        "*":"src/*.js",
        "github:*": "jspm_packages/github/*",
        "npm:*": "jspm_packages/npm/*"
    },
    ...
}
```

## Style

Using Twitter Bootstrap and the free Cerulean theme from https://bootswatch.com/3/cerulean/

Also using Font Awesome along with a style for an input box with a search image from https://bootsnipp.com/snippets/featured/support-glyph-and-fa-icon-inside-input

## Plugins

Using Aurelia's Http-Client (see /src/customers/customerData.js) and Validation (see /src/customers/search.js and search.html) plugins.

Add the plugins using `jspm install aurelia-http-client aurelia-validation`

## Reading Environment Variables
PCF does not support static file applications reading environment variables. Needed to find a solution to allow the UI to call the API regardless of the deployed environment.

Tried multiple methods like using location includes in the nginx config and replacing the nginx config outright with no success.

Node.js has a method using process.env, but that requires running a Node.js app.

There is a cfenv package that is supposed to provide access to the VCAP_Application and VCAP_Services environment variables, but I was not able to get that working.

Added an api controller that supports the get method and takes a single string argument to specify the name of the environment variable to read. It returns the value of that env var.
Included a CustomerApiUrlLoader class that calls the controller to retrieve the environment variable value for the Rubicon API endpoint.

Added the following routes in the sandbox space to get around the CORS limitation on host name and port.
UI  -> https://rubicon-sandbox.cfapps.pcf1.vc1.pcf.dell.com
API -> https://rubicon-sandbox.cfapps.pcf1.vc1.pcf.dell.com/api

See https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#create-route for more info

Adding these additional routes that use the same host and domain but use different paths for routing allow the UI to call to the API and avoid CORS policies and it allows the call to be made with a relative path like "/api/v2/customers" since they are using the same host and domain names further simplifying how to reach the api from the UI without having to know about where it is deployed or using environment variables.

---

### Notes
- Can install a lightweight http server using`npm install http-server -g` and run it from your project's **wwwroot** directory using `http-server -a localhost -p 9000`