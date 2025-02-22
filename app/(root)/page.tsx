import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps){
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  console.log(events)

  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10'>
      <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2×1:gap-0'>
        <div className='flex flex-col justify-center gap-8'>
          <h1 className='h1-bold'>
          Combines the journey toward health with the idea of finding joy.

          </h1>
          <p className='p-regular-20 md:p-regular-24'>Evently isn’t just about planning events it’s about creating impactful experiences. From medical conferences to wellness workshops, our platform ensures seamless organization so healthcare professionals can focus on what matters most improving lives and advancing well being. </p>
          <Button size='lg' asChild className='button w-full sm:w-fit'>
            <Link href='#events'>
            Explore Now
            </Link>
          </Button>

        </div>
        <Image
          src='/assets/images/photo.webp'
          alt='hero'
          width={800}
          height={800}
          className='max-h-[68vh] object-contain object-center 2xl:max-h-[50vh]' 
        />

      </div>

    </section>
    <section id='events' className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
      <h2 className='h2-bold'>Trusted by <br /> Thousands of Events</h2>
      <div className='flex w-full flex-col gap-5 md:flex-row'>
        <Search/>
        <CategoryFilter/>

      </div>
      <Collection 
      data={events?.data}
      emptyTitle="No Events Found"
      emptyStateSubtext="Come back later"
      collectionType="All_Events"
      limit={6}
      page={'page'}
      totalPages={events?.totalPages}
      />

    </section>
      
    </>
  )
}
