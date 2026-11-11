import { provideEditingConfig } from 'scrivito'
import { QuicksightDashboardWithSelection2Widget } from './QuicksightDashboardWithSelection2WidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(QuicksightDashboardWithSelection2Widget, {
  title: 'QuickSight Dashboard 2 (Selectable)',
  thumbnail: Thumbnail,
  attributes: {
    dashboardId: {
      title: 'Default dashboard ID',
      description:
        'Optional. Preselected when the page loads, if present in the ' +
        'dashboard list returned by the backend; otherwise the first ' +
        'dashboard in that list is shown. Visitors can change the ' +
        'selection via the dropdown.',
    },
  },
  properties: ['dashboardId'],
})
