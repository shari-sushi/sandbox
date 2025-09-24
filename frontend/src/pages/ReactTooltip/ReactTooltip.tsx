import { Tooltip } from "react-tooltip"

export default function ReactTooltipPage() {
  return <Component />
}

export interface Props {
  id?: string
}

export const Component = ({ id }: Props) => {
  const tooltipContent = "たぬき系ぽんぽこVTuber事務所設立マーケティングが14時からあるので朝会欠席予定"
  return (
    <div className="m-42">
      <div>
        {id}
        {tooltipContent}
      </div>

      <a data-tooltip-id="my-tooltip" data-tooltip-content="1" data-some-relevant-attr="wow">
        ◕‿‿◕
      </a>
      <a data-tooltip-id="my-tooltip" data-tooltip-content="2" data-some-relevant-attr="so relevant">
        ◕‿‿◕
      </a>
      <a data-tooltip-id="my-tooltip" data-tooltip-content="3" data-some-relevant-attr="much important">
        ◕‿‿◕
      </a>
      <Tooltip
        style={{
          maxWidth: "320px",
          wordBreak: "break-all",
        }}
        render={({ content, activeAnchor }) => (
          <span className="break-words w-20">
            The element #{content} is currently active.
            <br />
            Relevant attribute: {activeAnchor?.getAttribute("data-some-relevant-attr") || "not set"}
          </span>
        )}
      />
    </div>
  )
}
