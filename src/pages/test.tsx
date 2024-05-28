import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import CardListAddButton from '@/components/test/CardListAddButton'
import EventBannerAddButton from '@/components/test/EventBannerAddButton'
import EventForm from '@/components/test/EventForm'
import TransactionForm from '@/components/test/TransactionForm'

function TestPage() {
  return (
    <Flex direction="column">
      <Text bold={true}>배너</Text>
      <EventBannerAddButton />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>카드</Text>
      <CardListAddButton />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <EventForm />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>입출금 테스트</Text>
      <TransactionForm />
    </Flex>
  )
}

export default TestPage
