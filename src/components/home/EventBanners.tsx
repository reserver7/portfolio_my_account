import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Skeleton from '@shared/Skeleton'
import Text from '@shared/Text'
import withSuspense from '@shared/hocs/withSuspense'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import useEventBanners from './hooks/useEventBanners'

const EventBanners = () => {
  const { data } = useEventBanners()

  return (
    <div>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  style={{ backgroundColor: banner.backgroundColor }}
                  justify="space-between"
                  css={bannerStyles}
                >
                  {/* 왼쪽 */}
                  <Flex direction="column">
                    <Text bold={true}>{banner.title}</Text>
                    <Text typography="t6">{banner.subTitle}</Text>
                  </Flex>

                  {/* 오른쪽 */}
                  <Image src={banner.iconUrl} width={40} height={40} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`

export default withSuspense(EventBanners, {
  fallback: <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />,
})
