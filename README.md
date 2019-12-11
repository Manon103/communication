<!-- # Communication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
#   c o m m u n i c a t i o n 
 
  -->



## 安装依赖

需要进入communication和server文件夹中分别进行`npm i`

## 启动项目

使用 `npm start` 进行项目启动

## 项目详情

  - 前端使用 angular+primeNG ，后端使用 node express 框架，数据库使用 mongoose
  - 插件：表情库使用 ngx-odinvt-emoji-mart，下面会详细介绍该插件的使用方法

    - 第一步：安装包，

    `npm install ngx-odinvt-emoji-mart`
    - 第二步：导入模块：

    `import { PickerModule } from 'ngx-odinvt-emoji-mart';`

    - 第三步：样式使用

    `<emoji-mart exclude="[flags]" set="apple" (emojiClick)="addEmoji($event)" [showPreview]="false" [i18n]="I18n"></emoji-mart>`

    具体html使用方法官网上有，在此只是介绍如何获取选中的表情：

    点击事件中传参$event，通过`event.emoji.native`可以显示选择的表情



