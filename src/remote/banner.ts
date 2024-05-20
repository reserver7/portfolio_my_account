import { COLLECTIONS } from '@/constants/collection'
import { EventBanner } from '@/models/banner'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { store } from './firebase'

export async function getEventBanners({ hasAccount }: { hasAccount: boolean }) {
  const eventBannerQuery = query(
    collection(store, COLLECTIONS.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  )

  const snapshot = await getDocs(eventBannerQuery)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventBanner),
  }))
}
