type Props = {
  image: JSX.Element;
  title: string;
  description: string | JSX.Element;
};

export default function FeatureItem({ image, title, description }: Props) {
  return (
    <div className="flex sm:flex-1 flex-col max-sm:w-[47%] max-sm:mt-10">
      {image}
      <div className="flex flex-col mt-10 max-sm:mt-5 w-full">
        <div className="text-3xl max-sm:text-xl font-[450]">{title}</div>
        <div className="mt-6 max-sm:mt-3 text-lg max-sm:text-sm font-[305]">{description}</div>
      </div>
    </div>
  );
}
