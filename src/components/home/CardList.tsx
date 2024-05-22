import withSuspense from '@/hooks/withSuspense'
import Badge from '@shared/Badge'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import { useRouter } from 'next/router'
import Button from '../shared/Button'
import Skeleton from '../shared/Skeleton'
import useCards from './hooks/useCards'

const CardList = () => {
  const { data } = useCards()
  const isShowMoreButton = data?.items.length ?? 0 > 5
  const navigate = useRouter()

  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      <ul>
        {data?.items
          .slice(0, 5)
          .map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
      </ul>
      {isShowMoreButton ? (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button
            full={true}
            weak={true}
            size="medium"
            onClick={() => navigate.push('/card')}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      {[...new Array(5)].map((_, idx) => (
        <ListRow
          key={idx}
          contents={
            <ListRow.Texts
              title={<Skeleton width="92vw" height={25} />}
              subTitle={<Skeleton width="92vw" height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

export default withSuspense(CardList, {
  fallback: <CardListSkeleton />,
})
