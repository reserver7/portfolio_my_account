import { COLLECTIONS } from '@/constants/collection'
import { EVENT_BANNERS } from '@/mock/banner'
import { store } from '@/remote/firebase'
import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

const EventBannerAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    EVENT_BANNERS.forEach((banner) => {
      const bannerRef = doc(collection(store, COLLECTIONS.EVENT_BANNER))

      batch.set(bannerRef, banner)
    })

    await batch.commit()

    alert('배너 데이터가 추가되었습니다')
  }

  return <Button onClick={handleButtonClick}>이벤트 배너 데이터 추가</Button>
}

export default EventBannerAddButton
