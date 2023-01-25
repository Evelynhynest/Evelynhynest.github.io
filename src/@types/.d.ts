export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

declare module '*.json'
