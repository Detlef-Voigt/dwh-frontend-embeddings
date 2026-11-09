import { provideEditingConfig } from 'scrivito'
import { QuicksightDashboardWithSelectionWidget } from './QuicksightDashboardWithSelectionWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(QuicksightDashboardWithSelectionWidget, {
  title: 'QuickSight Dashboard (Selectable)',
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
