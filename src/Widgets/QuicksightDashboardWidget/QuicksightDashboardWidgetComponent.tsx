import { provideComponent, WidgetTag } from 'scrivito'
import { QuicksightDashboardWidget } from './QuicksightDashboardWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { QuicksightDashboardEmbed } from '../../Components/QuicksightDashboardEmbed'

provideComponent(QuicksightDashboardWidget, ({ widget }) => {
  const dashboardId = widget.get('dashboardId')

  if (!dashboardId) {
    return (
      <EditorNote>
        Please set a dashboard ID in the widget properties.
      </EditorNote>
    )
  }

  return (
    <WidgetTag>
      <QuicksightDashboardEmbed dashboardId={dashboardId} />
      <p>dashboardId={dashboardId}</p>
    </WidgetTag>
  )
})
