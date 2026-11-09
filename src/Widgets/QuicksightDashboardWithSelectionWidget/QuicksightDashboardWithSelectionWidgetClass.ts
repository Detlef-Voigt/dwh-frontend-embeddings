import { provideWidgetClass } from 'scrivito'

export const QuicksightDashboardWithSelectionWidget = provideWidgetClass(
  'QuicksightDashboardWithSelectionWidget',
  { attributes: { dashboardId: 'string' } },
)

export type QuicksightDashboardWithSelectionWidgetInstance = InstanceType<
  typeof QuicksightDashboardWithSelectionWidget
>
