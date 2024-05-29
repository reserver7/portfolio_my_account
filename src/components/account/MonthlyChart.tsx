import { colors } from '@/styles/colorPalette'
import { AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Bar } from '@visx/shape'
import { format, parseISO } from 'date-fns'
import { memo, useMemo } from 'react'

// 월별 데이터
// 날짜: 월별 마지막일자
// 잔고: 월별 마지막일자의 잔고

interface ChartData {
  // x
  date: string
  // y
  balance: number
}

interface MonthlyChartProps {
  chartData: ChartData[]
  height: number
  width: number
}

interface ChartWrapperProps {
  height?: number
  chartData: ChartData[]
}

const verticalMargin = 120

// accessors
const getX = (d: ChartData) => d.date
const getY = (d: ChartData) => Number(d.balance) * 100
const formatDate = (date: string) => format(parseISO(date), 'M월')

const MonthlyChart = ({ chartData, height, width }: MonthlyChartProps) => {
  console.log('width', width)
  console.log('chartData', chartData)

  // bounds
  const xMax = width
  const yMax = height - verticalMargin

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: chartData.map(getX),
        padding: 0.4,
      }),
    [chartData, xMax],
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...chartData.map(getY))],
      }),
    [chartData, yMax],
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {chartData.map((d) => {
          const date = getX(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getY(d)) ?? 0)
          const barX = xScale(date)
          const barY = yMax - barHeight
          return (
            <Bar
              key={`bar-${date}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={colors.blue}
            />
          )
        })}
      </Group>
      <AxisBottom
        top={yMax + 60}
        scale={xScale}
        tickFormat={formatDate}
        stroke={colors.blue}
        tickStroke={colors.blue}
        tickLabelProps={{
          fill: colors.blue,
          fontSize: 12,
          textAnchor: 'middle',
        }}
      />
    </svg>
  )
}

function ChartWrapper({ height = 200, chartData }: ChartWrapperProps) {
  return (
    <ParentSize>
      {({ width }) => (
        <MonthlyChart width={width} height={height} chartData={chartData} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)
