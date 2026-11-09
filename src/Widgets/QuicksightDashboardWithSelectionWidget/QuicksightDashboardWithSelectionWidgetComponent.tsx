import { useEffect, useState } from 'react'
import { connect, provideComponent, WidgetTag } from 'scrivito'
import { QuicksightDashboardWithSelectionWidget } from './QuicksightDashboardWithSelectionWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { DataErrorEditorNote } from '../../Components/DataErrorEditorNote'
import { Loading } from '../../Components/Loading'
import { QuicksightDashboardEmbed } from '../../Components/QuicksightDashboardEmbed'
import { fetchQuicksightDashboardIds } from '../../Data/Quicksight/fetchQuicksightDashboardIds'

provideComponent(QuicksightDashboardWithSelectionWidget, ({ widget }) => (
  <WidgetTag>
    <QuicksightDashboardSelection
      initialDashboardId={widget.get('dashboardId')}
    />
  </WidgetTag>
))

const QuicksightDashboardSelection = connect(
  function QuicksightDashboardSelection({
    initialDashboardId,
  }: {
    initialDashboardId: string | null
  }) {
    const [dashboardIds, setDashboardIds] = useState<string[] | null>(null)
    const [error, setError] = useState<unknown>(null)
    const [selectedDashboardId, setSelectedDashboardId] = useState<
      string | null
    >(null)

    useEffect(() => {
      let cancelled = false

      fetchQuicksightDashboardIds()
        .then((ids) => {
          if (cancelled) return
          setDashboardIds(ids)
          setSelectedDashboardId(
            (initialDashboardId && ids.includes(initialDashboardId)
              ? initialDashboardId
              : ids[0]) ?? null,
          )
        })
        .catch((e) => {
          if (!cancelled) setError(e)
        })

      return () => {
        cancelled = true
      }
    }, [initialDashboardId])

    if (error) return <DataErrorEditorNote error={error} />
    if (!dashboardIds) return <Loading />
    if (dashboardIds.length === 0) {
      return <EditorNote>No dashboards are available to select.</EditorNote>
    }

    return (
      <>
        <select
          className="form-select mb-3"
          value={selectedDashboardId ?? ''}
          onChange={(e) => setSelectedDashboardId(e.target.value)}
        >
          {dashboardIds.map((id) => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
        {selectedDashboardId && (
          <QuicksightDashboardEmbed dashboardId={selectedDashboardId} />
        )}
      </>
    )
  },
  { loading: Loading },
)
