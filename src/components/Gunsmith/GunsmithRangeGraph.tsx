import 'chart.js/auto'

import { Line } from 'react-chartjs-2'

export const GunsmithRangeGraph = (props: { rangeData: number[] }) => {
  const data = {
    labels: [
      '0m',
      '100m',
      '200m',
      '300m',
      '400m',
      '500m',
      '600m',
      '700m',
      '800m',
      '900m',
      '1000m',
    ],
    datasets: [
      {
        id: 1,
        label: 'Damage',
        data: props.rangeData,
      },
    ],
  }

  return (
    <div className="w-full pt-16">
      <Line
        datasetIdKey="id"
        data={{
          labels: data.labels,
          datasets: data.datasets,
        }}
      />
    </div>
  )
}
