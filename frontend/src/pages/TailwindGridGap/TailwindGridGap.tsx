export default function TailwindGridGap() {
  return <Component />
}

export interface Props {
  id?: string
}

export const Component = ({ id }: Props) => {
  return (
    <div className="h-fit w-fit">
      <>{id}</>
      <div className="mt-4 select-text">
        <h2>原因</h2>
        <div>gridが範囲を線で区切る操作だから？</div>
        <div>https://developer.mozilla.org/ja/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout</div>
        <h2>gridの時は`w-fit h-fit grid grid-cols-[num] gap-[num]`して、全体サイズはその親で指定すべきかも</h2>
      </div>
      <div className="h-fit w-fit grid grid-cols-2 gap-2">
        <div className="w-96 h-96 bg-gray-500">
          <div>
            gap-2を指定しているが同じ要素でh, wを指定したらいっぱいに広がるので意味が無い
            <div className="h-[300px] w-[300px] bg-amber-50 grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }, (_, i) => {
                return (
                  <div key={i} className="h-8 w-8 bg-green-600">
                    {i + 1}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="w-96 h-96 bg-gray-500">
          <div>w,h を指定せずgap-2で横に目いっぱい広がる…？</div>
          <div className="bg-amber-50 grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => {
              return (
                <div key={i} className="h-8 w-8 bg-green-600">
                  {i + 1}
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-96 bg-gray-500">
          <div>h-fit w-fit gap-2で良い感じになる</div>
          <div className="h-fit w-fit bg-amber-50 grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => {
              return (
                <div key={i} className="h-8 w-8 bg-green-600">
                  {i + 1}
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-96 bg-gray-500">
          <div>h-fit w-fit gap-2で良い感じになる</div>
          <div className="h-fit  w-fit bg-amber-50 grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => {
              return (
                <div key={i} className="h-12 w-12 bg-green-600">
                  {i + 1}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
