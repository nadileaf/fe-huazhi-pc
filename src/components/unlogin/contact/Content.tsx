import { Image } from '@nextui-org/react';
import { withCdnPrefix } from '@/utils/file';

const mail = {
  image: 'mail',
  title: '服务邮箱',
  description: (
    <>
      对于任何使用问题或意见反馈，您可以发送邮件至
      <a className="text-primary border-b border-primary  cursor-auto">exycservice@163.com</a>
      ，我们将在15天内回复。
    </>
  ),
};

const phone = {
  image: 'phone',
  title: '服务热线',
  description: (
    <>
      如果您希望快速解决问题，欢迎致电我们的客服热线 021-33354335
      <br />
      客服时间为周一至周五9:00-17:00。
    </>
  ),
};

const online = {
  image: 'online',
  title: '在线咨询',
  description: '通过我们的在线客服，您可以实时与专业顾问沟通获取及时的帮助与支持。',
};

const question = {
  image: 'question',
  title: '常见问题',
  description: (
    <>
      在我们的
      <a
        className="text-primary"
        href="https://b193f6sljk.feishu.cn/docx/O90tdW5X6ofRqTxE579c6Zp0nhf"
        target="_blank"
      >
        FAQ
      </a>
      页面，您可以找到常见问题的解答，帮助您快速解决疑问。
    </>
  ),
};

const media = {
  image: 'media',
  title: '社交媒体',
  description: (
    <>
      关注我们的社交平台，获取最新的求职资讯与平台动态: <br />
      微信公众号: e校优才。
    </>
  ),
};

const contents_pc = [mail, phone, online, question, media];
const contents_mobile = [mail, online, media, phone, question];

export default function Content() {
  return (
    <section className="pt-24 pb-40 bg-white">
      <div className="wrapper">
        <div className="pb-48">
          <div className="title pb-8">联系我们</div>
          <div className="w-[714px] text-2xl">
            无论您有什么问题或建议，e校优才团队始终在您身边，随时为您提供帮助。我们致力于为每一位用户提供优质的支持与服务，帮助您在求职过程顺利前行。
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          {contents_pc.map((item) => (
            <ContactItem key={item.title} {...item} className="w-[46%] mb-20"></ContactItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  image,
  title,
  description,
  className,
}: {
  image: string;
  title: string;
  description: string | JSX.Element;
  className?: string;
}) {
  return (
    <div className={`flex gap-6 ${className}`}>
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/contact/${image}.svg`)}
        width={40}
        height={40}
        alt=""
      ></Image>
      <div>
        <div className="text-3xl font-[450] mb-6">{title}</div>
        <div className="text-xl">{description}</div>
      </div>
    </div>
  );
}
