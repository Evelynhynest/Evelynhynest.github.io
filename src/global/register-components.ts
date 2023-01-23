import type { App } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

const components = [PageContent, PageSearch, PageModal]

export default function registerComponents(app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
