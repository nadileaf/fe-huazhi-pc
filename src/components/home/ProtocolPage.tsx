import HomeBreadcrumbs from './Breadcrumbs';

type Props = {
  title: string;
  publishDate: string;
  effectiveDate: string;
  content: JSX.Element;
  position: {
    title: string;
    href: string;
  };
};

export default function ProtocolPage({
  title,
  publishDate,
  effectiveDate,
  content,
  position,
}: Props) {
  return (
    <section className="bg-white">
      <div className="wrapper pt-14">
        <HomeBreadcrumbs position={position} />
        <article className="mt-14">
          <h2 className="text-4xl font-bold text-center mb-8">{title}</h2>
          <div className="flex items-center justify-center gap-8 mb-12 text-black-666 text-base">
            <span>发布日期：{publishDate}</span>
            <span>生效日期：{effectiveDate}</span>
          </div>
          {content}
        </article>
      </div>
    </section>
  );
}
