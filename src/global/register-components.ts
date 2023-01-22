import type { App } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'

const components = [PageContent, PageSearch]

export default function registerComponents(app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
