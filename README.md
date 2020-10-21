# AngularHttpclientExample2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. if localhost is already in use can use --port to run the project in different port

If showing error- 'Could not find module “@angular-devkit/build-angular”', install @angular-devkit/build-angular as dev dependency. This package is newly introduced in Angular 6.0.  
To install run `npm install --save-dev @angular-devkit/build-angular`


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Test cases for the unit test: 

AppComponent
- should create the app
- should have as title 'Centene'
- should contain List of Enrollees header on the page

DataService
- should be created
- should test DataService.sendGetRequest() function

EnrolleesComponent
- should create enrollees component
- should contain select option for paginator
- should contain searchbox on the page
- should correctly render the passed @Input value on search
- should contain table on the page
- should show header row in the table
- should show no elements in the table if there is no data
- should show one data element When there is one data in the server
- should contain paginator on the page


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
