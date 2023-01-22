import type { App } from 'vue'
import registerProperties from './register-properties'
import registerComponents from './register-components'

export function globalRegister(app: App): void {
  app.use(registerProperties)
  app.use(registerComponents)
}
