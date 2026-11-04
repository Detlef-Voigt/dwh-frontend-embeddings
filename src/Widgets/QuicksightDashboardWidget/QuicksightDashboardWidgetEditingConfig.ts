import { provideEditingConfig } from 'scrivito'
import { QuicksightDashboardWidget } from './QuicksightDashboardWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(QuicksightDashboardWidget, {
  title: 'QuickSight Dashboard',
  thumbnail: Thumbnail,
  attributes: {
    dashboardId: {
      title: 'Dashboard ID',
      description: 'The AWS QuickSight dashboard ID to embed.',
    },
  },
  properties: ['dashboardId'],
  validations: [
    [
      'dashboardId',
      (dashboardId: string | null) => {
        if (!dashboardId) {
          return {
            message: 'The dashboard ID should be set.',
            severity: 'warning',
          }
        }
      },
    ],
  ],
})
