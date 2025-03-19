'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useHash, useRequest } from '@/hooks/useHooks';
import { entityService } from '@/services/entity';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/stores/app';
import { truthy } from '@/utils/types';
import { JobOpportunitiesCard } from '@/components/entity/JobOpportunities';

import { projectService } from '@/services/project';
import { JobCard } from '@/components/entity/Job';
import { bannerService } from '@/services/banner';
import { Tab, Tabs, Image, Button, Link } from '@nextui-org/react';
import React from 'react';
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';
import { default as _SearchInput } from '@/components/SearchInput';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/react';
import { generateUrl, scrollToSection } from '@/utils/common';
import { recommendService } from '@/services/recommend';
import { get } from 'lodash-es';

export function SearchInput() {
  const [searchText, setSearchText] = useState('');

  const router = useRouter();
  function handleSearch(v: string) {
    v && router.push('/search?query=' + v);
  }

  return <_SearchInput value={searchText} onChange={setSearchText} onSearch={handleSearch} />;
}

export function TagNav({ tags }: { tags: Record<string, string[]> }) {
  const { user, login } = useAuthStore();
  const router = useRouter();
  function handleClick(title: string, tag: string) {
    if (!user) login();
    if (title === '热门职位') {
      scrollToSection(tag);
    } else if (title === '培训课程') {
      router.push('/task?type=Training');
    } else if (title === '测评中心') {
      router.push('/task?type=PinPinCloudEvaluation');
    } else if (title === '特色服务' && tag === '背景调查') {
      router.push('/task?type=BackgroundCheck');
    } else if (title === '特色服务' && tag === '人才政策') {
      router.push('/ai');
    }
  }

  return (
    <div>
      {Object.entries(tags).map(([title, tags]) => (
        <div key={title} className="flex gap-8 py-3">
          <div className="text-primary text-sm">{title}</div>
          <div className="flex gap-5">
            {tags.map((tag, i) => (
              <Link
                key={i}
                size="sm"
                color="foreground"
                underline="hover"
                className="cursor-pointer"
                onClick={() => handleClick(title, tag)}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Banner() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { data } = useRequest(() => bannerService.query());
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data?.map((item) => (
          <div key={item.url}>
            <Image src={item.url} alt={item.name} width={654} height={322} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export function HomeJobs({ className }: { className?: string }) {
  const sliderRef = useRef<Slider | null>(null);

  const sorts = [
    { label: '匹配度', value: '' },
    { label: '最新', value: 'meta.updatedAt:desc' },
  ];
  const [currentSort, setCurrentSort] = useState(sorts[0].value);

  const router = useRouter();
  const { user } = useAuthStore();
  const { data } = useRequest(() => query(), {
    before: () => !!user,
    refreshDeps: [user, currentSort],
  });

  function query() {
    return currentSort
      ? (projectService.query({
          channelTemplateId: 'JobToSystemEmployee',
          filters: [
            {
              key: 'data.standardFields.channel.payload.data.standardFields.space.payload.data.standardFields.name',
              values: ['校企合作专区'],
            },
          ],
        }) as unknown as Promise<SearchModel.SearchResponse<EntityModel.BusinessEntity<'Job'>>>)
      : recommendService.query({
          contextEntityType: 'SystemEmployee',
          contextOpenIds: user?.userId ? [user.userId] : [],
          targetEntityType: 'Job',
          filters: [{ key: '_exists_', values: ['data.managedFields'] }],
          sort: currentSort,
        });
  }

  function handleClick(data: any) {
    if (currentSort) {
      const entityId = get(data, 'projectPayload.openId');
      const projectId = get(data, 'meta.openId');
      router.push(generateUrl(`/entity/Job/${entityId}`, { projectId }));
    } else {
      const entityId = get(data, 'meta.openId');
      const projectId = get(data, 'data.managedFields.entityRelated.projects[0].projectId');
      router.push(generateUrl(`/entity/Job/${entityId}`, { projectId }));
    }
  }

  return (
    user && (
      <div className={`flex flex-col gap-5 ${className ?? ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="text-2xl font-medium  text-default-600">我校专区</div>
            <Tabs
              variant="light"
              color="primary"
              size="sm"
              selectedKey={currentSort}
              onSelectionChange={(v) => setCurrentSort(v.toString())}
            >
              {sorts.map((sort) => (
                <Tab key={sort.value} value={sort.value} title={sort.label}></Tab>
              ))}
            </Tabs>
          </div>
          <Button
            variant="light"
            color="primary"
            size="sm"
            onClick={() => router.push('/search?type=我校职位')}
          >
            查看更多
            <Icon icon="ri:arrow-right-s-line" className="text-lg" />
          </Button>
        </div>
        <div className="relative -mx-2.5">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...{
              dots: true,
              infinite: true,
              speed: 500,
              slidesToShow: 4,
              slidesToScroll: 4,
              arrows: false,
            }}
          >
            {data?.data.map((item) => (
              <div key={item.meta.openId} className="px-2.5">
                <JobCard data={item} mode="simple" onClick={handleClick} />
              </div>
            ))}
          </Slider>
          <Button
            variant="light"
            size="sm"
            isIconOnly
            className="absolute top-1/2 -translate-y-1/2 -left-8 text-default-400"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <Icon icon="ri:arrow-left-s-line" className="text-2xl" />
          </Button>
          <Button
            variant="light"
            size="sm"
            isIconOnly
            className="absolute top-1/2 -translate-y-1/2 -right-8 text-default-400"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <Icon icon="ri:arrow-right-s-line" className="text-2xl" />
          </Button>
        </div>
      </div>
    )
  );
}

export function HomeJobOpportunities({ tags }: { tags: string[] }) {
  const router = useRouter();
  //获取url hash,同步到当前tab
  const hash = useHash();
  useEffect(() => {
    const section = hash.replace('#', '');
    console.log(section);
    if (section) {
      if (tags.includes(section)) setCurrentTab(section);
      scrollToSection(section);
    }
  }, [hash, tags]);

  const [currentTab, setCurrentTab] = useState(tags[0]);
  const { currentLocation } = useAppStore();
  const { data } = useRequest(
    () =>
      entityService.query({
        entityType: 'JobOpportunities',
        filters: [
          currentTab ? { key: 'data.standardFields.tags.name', values: [currentTab] } : undefined,
          currentLocation.city
            ? {
                key: 'data.standardFields.locations.city',
                values: [currentLocation.city],
              }
            : undefined,
        ].filter(truthy),
      }),
    { refreshDeps: [currentTab, currentLocation.city] },
  );
  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-medium text-default-600">热门专区</div>

      <div className="flex items-center justify-between">
        <Tabs
          variant="underlined"
          color="primary"
          selectedKey={currentTab}
          onSelectionChange={(v) => scrollToSection(v.toString())}
          size="lg"
        >
          {tags.map((tag) => (
            <Tab key={tag} id={tag} value={tag} title={tag}></Tab>
          ))}
        </Tabs>
        <Button
          variant="light"
          color="primary"
          size="sm"
          onClick={() => router.push('/search?type=全网职位')}
        >
          查看更多
          <Icon icon="ri:arrow-right-s-line" className="text-lg" />
        </Button>
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
        {data?.data.map((item) => (
          <JobOpportunitiesCard key={item.meta.openId} data={item} mode="simple" />
        ))}
      </div>
    </div>
  );
}
