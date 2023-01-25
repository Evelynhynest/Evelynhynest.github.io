export const projectDir = `
|-- README.md
|-- commitlint.config.js
|-- env.d.ts
|-- index.html
|-- package.json
|-- public
|   |-- favicon.ico
|-- src
|   |-- @types
|   |-- App.vue
|   |-- assets
|   |   |-- css
|   |   |   |-- base.less
|   |   |   |-- index.less
|   |   |-- img
|   |       |-- login-bg.svg
|   |       |-- logo.svg
|   |-- auto-imports.d.ts
|   |-- base-ui
|   |   |-- base-echart
|   |   |   |-- data
|   |   |   |   |-- china.json
|   |   |   |-- hooks
|   |   |   |   |-- useEchart.ts
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |       |-- base-echart.vue
|   |   |       |-- types
|   |   |-- breadcrumb
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |       |-- breadcrumb.vue
|   |   |       |-- types
|   |   |           |-- index.ts
|   |   |-- card
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |       |-- card.vue
|   |   |       |-- types
|   |   |           |-- index.ts
|   |   |-- form
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |   |   |-- form.vue
|   |   |   |-- types
|   |   |       |-- index.ts
|   |   |-- table
|   |       |-- index.ts
|   |       |-- src
|   |       |   |-- table.vue
|   |       |-- types
|   |           |-- index.ts
|   |-- components
|   |   |-- nav-header
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |       |-- nav-header.vue
|   |   |       |-- user-info.vue
|   |   |-- nav-menu
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |       |-- nav-menu.vue
|   |   |-- page-charts
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |   |   |-- bar-echart.vue
|   |   |   |   |-- line-echart.vue
|   |   |   |   |-- map-echart.vue
|   |   |   |   |-- pie-echart.vue
|   |   |   |   |-- rose-echart.vue
|   |   |   |-- types
|   |   |   |   |-- index.ts
|   |   |   |-- utils
|   |   |       |-- convert-data.ts
|   |   |       |-- coordinate-data.ts
|   |   |-- page-content
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |       |-- page-content.vue
|   |   |       |-- test.vue
|   |   |-- page-modal
|   |   |   |-- index.ts
|   |   |   |-- src
|   |   |       |-- page-modal.vue
|   |   |-- page-search
|   |       |-- index.ts
|   |       |-- src
|   |           |-- page-search.vue
|   |-- components.d.ts
|   |-- global
|   |   |-- index.ts
|   |   |-- register-components.ts
|   |   |-- register-properties.ts
|   |-- hooks
|   |   |-- usePageModal.ts
|   |   |-- usePageSearch.ts
|   |   |-- usePermission.ts
|   |-- main.ts
|   |-- router
|   |   |-- index.ts
|   |   |-- main
|   |       |-- analysis
|   |       |   |-- dashboard
|   |       |   |   |-- dashboard.ts
|   |       |   |-- overview
|   |       |       |-- overview.ts
|   |       |-- product
|   |       |   |-- category
|   |       |   |   |-- category.ts
|   |       |   |-- goods
|   |       |       |-- goods.ts
|   |       |-- story
|   |       |   |-- chat
|   |       |   |   |-- chat.ts
|   |       |   |-- list
|   |       |       |-- list.ts
|   |       |-- system
|   |           |-- department
|   |           |   |-- department.ts
|   |           |-- menu
|   |           |   |-- menu.ts
|   |           |-- role
|   |           |   |-- role.ts
|   |           |-- user
|   |               |-- user.ts
|   |-- service
|   |   |-- index.ts
|   |   |-- login
|   |   |   |-- login.ts
|   |   |   |-- types.ts
|   |   |-- main
|   |   |   |-- analysis
|   |   |   |   |-- analysis.ts
|   |   |   |-- system
|   |   |       |-- system.ts
|   |   |-- request
|   |   |   |-- config.ts
|   |   |   |-- index.ts
|   |   |   |-- type.ts
|   |   |-- types.ts
|   |-- stores
|   |   |-- comparePinia.md
|   |   |-- compareVuex.md
|   |   |-- counter.ts
|   |   |-- login
|   |   |   |-- login.ts
|   |   |   |-- types.ts
|   |   |-- main
|   |       |-- analysis
|   |       |   |-- analysis.ts
|   |       |   |-- types.ts
|   |       |-- system
|   |           |-- system.ts
|   |           |-- types.ts
|   |-- test_env
|   |-- utils
|   |   |-- date-format.ts
|   |   |-- localCache.ts
|   |   |-- map-menus.ts
|   |-- views
|       |-- login
|       |   |-- components
|       |   |   |-- login-account.vue
|       |   |   |-- login-panel.vue
|       |   |   |-- login-phone.vue
|       |   |-- config
|       |   |   |-- loginRules-config.ts
|       |   |-- hooks
|       |   |-- login.vue
|       |-- main
|       |   |-- analysis
|       |   |   |-- dashboard
|       |   |   |   |-- dashboard.vue
|       |   |   |-- overview
|       |   |       |-- overview.vue
|       |   |-- main.vue
|       |   |-- product
|       |   |   |-- category
|       |   |   |   |-- category.vue
|       |   |   |-- goods
|       |   |       |-- config
|       |   |       |   |-- content.config.ts
|       |   |       |-- goods.vue
|       |   |-- story
|       |   |   |-- chat
|       |   |   |   |-- chat.vue
|       |   |   |-- list
|       |   |       |-- list.vue
|       |   |-- system
|       |       |-- department
|       |       |   |-- department.vue
|       |       |-- menu-manage
|       |       |   |-- config
|       |       |   |   |-- content.config.ts
|       |       |   |-- menu-manage.vue
|       |       |-- role
|       |       |   |-- config
|       |       |   |   |-- content.config.ts
|       |       |   |   |-- modal.config.ts
|       |       |   |   |-- search.config.ts
|       |       |   |-- role.vue
|       |       |-- user
|       |           |-- config
|       |           |   |-- content.config.ts
|       |           |   |-- modal.config.ts
|       |           |   |-- search.config.ts
|       |           |-- user.vue
|       |-- not-found
|           |-- not-found.vue
|-- tsconfig.config.json
|-- tsconfig.json
|-- vite.config.ts
`
