import ProtocolPage from '@/components/home/ProtocolPage';
import { headers } from 'next/headers';

export default function PrivacyPolicy() {
  return (
    <div>
      <ProtocolPage
        title="e校优才隐私协议"
        publishDate="2024年8月1日"
        effectiveDate="2024年8月1日"
        content={<Content />}
        position={{ title: '隐私协议', href: '/privacy-policy' }}
      ></ProtocolPage>
    </div>
  );
}
function Content() {
  return (
    <div className="text-lg font-light text-default-700">
      <div className="mb-8">
        欢迎您使用上海中智科技应用发展有限公司提供的e
        校优才产品及服务！我们深知个人信息对您的重要性，您的信赖对我们非常重要，我们将严格遵守法律法规要求采取相应的安全保护措施，致力于保护您的个人信息安全可控。基于此，e
        校优才平台（以下简称“e 校优才”或“我们”）制定本《e
        校优才隐私协议》（下称“本协议”/“本隐私协议”），帮助您充分了解在您使用我们产品和服务的过程中，我们会如何收集、使用、共享、存储、删除和保护您的个人信息以及您可以如何管理您的个人信息，以便您更好地作出适当的选择。
      </div>
      <div className="mb-8">
        本《隐私协议》将详细说明每个功能可能收集的个人信息范围、收集目的，收集方式，以及拒绝提供个人信息可能的影响。请知悉，如拒绝提供非必要个人信息或附加功能所需信息时，您仍然能够使用e
        校优才基本功能。
      </div>
      <div className="">
        我们承诺在收集个人信息时，应当限于实现处理目的的最小范围，不会过度收集您的个人信息。因此我们建议您完整地阅读本隐私权政策，以帮助您了解维护自己隐私权的方式。如果您有任何疑问、意见或建议，请通过e
        校优才提供的各种联系方式与我们联系。
      </div>
      <div className="divider mt-24 mb-14"></div>
      <h3 className="text-3xl font-semibold mb-10">本协议的适用范围</h3>
      <ul className="list-primary">
        <li>
          本隐私权协议适用于e校优才平台所有服务，服务包括向您提供页面浏览、网站注册、网站登录服务，以及通过e校优才向您提供的技术服务。
        </li>
        <li>
          本隐私权协议<span className="text-primary-light">不适用于其他第三方向您提供的服务</span>
          ，其他第三方服务适用其向您另行说明的隐私协议等个人信息收集使用则。
        </li>
        <li>
          需要特别说明的是，作为e校优才的用户，
          <span className="text-primary-light">
            若您利用e校优才的技术服务为您的用户再行提供服务，因您的业务数据属于您有，您应当另行与您的用户约定隐私权协议。
          </span>
        </li>
      </ul>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-bold mb-10">我们如何收集和使用您的用户信息</h3>
      <h4 className="text-2xl font-semibold mb-8">我们收集您的用户信息的情形</h4>
      <h5 className="text-lg font-semibold mb-5">帮助您成为我们的会员</h5>
      <p className="mb-8">
        您在注册/登录页面创建账户时，无论您是管理者或是普通用户，
        <span className="text-primary-light">须先确认您所属的机构已经开通了 e 校优才服务</span>
        ，然后向我们提供您在中华人民共和国境内手机号码。您提交的手机号码，将用于您注册、登录、绑定账户、密码找回时接受验证码，接受测评类产品的服务链接，并且作为您与e校优才指定的联系方式之一，用来接受相关业务通知（如新品上线、服务变更等），并且e校优才可通过此联系方式向您营销推广、宣传产品、发送业务通知（含账单）或与您进行业务沟通（“安全手机号码”或“账号联系人手机号码”）。
      </p>
      <h5 className="text-lg font-semibold mb-5">您提供技术服务时收集信息</h5>
      <ul className="list-primary">
        <li>
          <span className="text-primary-light">设备信息：</span>
          我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（例如设备型号、操作系统版本、设备设置、MAC地址及
          IMEI 、 IDFA 、 OAID及其他设备标识符等软硬件特征信息）、设备所3在位置相关信息（例如 IP
          地址、
          GPS位置以及能够提供相关信息的Wi-Fi接入点、蓝牙和基站等传感器信息）。我们可能会将前面两类信息进行关联，以便我们能在不同设备上为您提供一致的服务。
        </li>
        <li>
          <span className="text-primary-light">日志信息：</span>
          当您使用我们的网站或客户端提供的服务时，我们会自动收集您对我们服务的详细使用情况，作为有关网络日志保存。例如您的搜索查询内容、IP地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问的网页记录等。
        </li>
        <li>
          <span className="text-primary-light">用户账户的支持信息：</span>
          基于您使用e校优才服务而产生的用户的咨询记录、报障记录和针对用户故障的排障过程（如通信或通话记录），e校优才将通过记录、分析这些信息以便更及时响应您的帮助请求，以及用于改进服务。我们在向您提供业务功能或具体服务时，我们会按照本协议以及相应的产品服务协议的约定收集、使用、存储、对外提供及保护您的用户信息；超出本协议以及相应的产品服务协议约定收集您的用户信息的，我们会另行向您说明信息收集的范围与目的，并征得您的同意后方收集提供相应服务所必要的您的信息；如您选择不提供前述信息，将会影响到您使用相应产品，但不会影响您使用e校优才网站基本功能和其他产品。
        </li>
      </ul>

      <h4 className="text-2xl font-semibold mt-10 mb-8">我们使用您的用户信息的情形</h4>
      <h5 className="mb-5 font-bold">我们出于如下目的，使用您提交以及我们收集的用户信息：</h5>

      <ul className="list-primary">
        <li>
          为了向您提供服务，我们会向您发送信息、通知或与您进行业务沟通，包括但不限于为保证服务完成所必须的验证码、使用服务时所必要的推送通知
        </li>
        <li>
          为了维护、改进服务，向您提供更符合您个性化需求的信息展示，我们可能将来自e校优才网站某项服务的用户信息与来自其他项服务的信息结合起来，做出特征模型并进行用户画像，向您展示、推送信息和可能的商业广告，包括但不限于关于e校优才产品的新闻以及市场活动及优惠促销信息、或其他您可能感兴趣的内容。如果您不想接收我们给您发送的商业性电子信息，您可通过短信提示回复退订或根据信息中提供的退订方式予以退订
        </li>
        <li>
          我们可能以用户信息统计数据为基础，设计、开发、推广全新的产品及服务；我们会对我们的服务使用情况进行统计，并可能会与公众或第三方分享这些统计信息，但这些统计信息不包含您的任何身份识别信息
        </li>
        <li>
          为提高您使用我们及我们关联公司提供服务的安全性，确保操作环境安全与识别账号异常状态，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或e校优才相关协议、规则的情况，我们可能使用您的会员信息、并整合设备信息、有关网络日志以及我们关联公司合法分享的信息，来判断您账户及交易风险、进行身份验证、安全事件的检测及防范，并依法采取必要的记录、审计、分析、处置措施
        </li>
        <li>
          如超出收集用户信息时所声称的目的，或者在超出具有直接或合理关联的范围使用用户信息前，我们会再次向您告知并征得您的明示同意
        </li>
      </ul>

      <h5 className="mb-5 font-bold">向您提供的其他附加服务而使用您提交以及我们收集的用户信息：</h5>
      <p className="mb-5">
        为向您提供更便捷、更优质、个性化的产品及/或服务，努力提升您的体验，我们在向您提供的以下附加服务中可能会收集和使用您的个人信息。
        <span className="text-primary-light">
          如果您不提供这些信息，通常（除电话权限外）不会影响您使用e校优才网站的浏览、使用、购买等基本服务，但您可能无法获得这些附加服务给您带来的用户体验。
        </span>
      </p>
      <p className="mb-5 font-bold">这些附加服务包括：</p>

      <ul className="list-green-check-mark list-inside">
        <li>
          基于
          <span className="text-primary-light">相册（图片库/视频库）的图片/ 视频访问及上传。</span>
          的附加服务：您可在开启相册权限后使用该功能上传您的照片/图片/视频以实现在e校优才内更换头像或与客服沟通提供证明
        </li>
        <li>
          基于<span className="text-primary-light">电话状态</span>
          的附加服务：为保障您的账号与使用安全，您需要授权我们读取本机识别码，拒绝后e校优才网站因安全风险将无法正常运行。
        </li>
        <li>
          基于<span className="text-primary-light">存储权限</span>
          的附加服务：我们向您申请获取此权限，目的是为了保障客户端的稳定运行。在您开启我们可读取/写入您设备存储的权限后，我们将自您设备存储空间内读取或向其中写入图片、文件、崩溃日志信息等必要信息，用于向您提供信息发布或在本地记录崩溃日志信息等功能。
        </li>
      </ul>

      <p className="mt-5">
        您理解并同意，上述附加服务可能需要您在您的设备中存储、相册（图片库）、电话、位置以实现这些权限所涉及信息的收集和使用。您可在您浏览器的
        <span className="text-primary-light">“设置- 安全和隐私设置- 各网站的权限及存储的数据”</span>
        中查看上述权限的状态，并可<span className="text-primary-light">自行</span>
        决定这些权限随时的开启或关闭。请您注意，您开启任一权限即代表您授权我们可以收集和使用相关个人信息来为您提供对应服务，您一旦关闭任一权限即代表您取消了授权，我们将不再基于对应权限继续收集和使用相关个人信息，也无法为您提供该权限所对应的服务。但是，您关闭权限的决定不会影响此前基于您的授权所进行的信息收集及使用。
      </p>

      <div className="divider my-14"></div>

      <h3 className="text-3xl mb-10">我们如何共享、转让、公开披露您的用户信息</h3>
      <h4 className="text-2xl mb-8">共享</h4>
      <p className="text-lg mb-5">我们不会与其他组织和个人共享您的用户信息，但以下情况除外：</p>
      <ul className="list-primary mb-5">
        <li>
          在<span className="text-primary-light">获取明确同意的情况下：</span>
          获得您的明确同意后，我们会与其他方共享您的用户信息
        </li>
        <li>
          在<span className="text-primary-light">法定情形下的共享：</span>
          我们可能会根据法律法规规定、诉讼、仲裁解决需要，或按行政、司法机关依法提出的要求，对外共享您的用户信息
        </li>
        <li>
          为保障我们客户端的稳定运行、功能实现，使您能够使用和享受更多的服务及功能，我们的应用中会嵌入授权合作伙伴的
          SDK 或其他类似的应用程序。我们会对授权合作伙伴获取有关信息的应用程序接口（
          API）、软件工具开发包（ SDK
          ）进行严格的安全检测，并与授权合作伙伴约定严格的数据保护措施，令其按照本协议以及其他任何相关的保密和安全措施来处理个人信息。
        </li>
      </ul>

      <p className="mb-5">
        此外，当您在我方平台中使用小程序时，我们为实现提供对接等技术支持的目的，需向小程序开发者及技术服务提供方（例如：微信、支付宝小程序平台运营方）获取
        <span className="text-primary-light">您为实现前述目的必要的个人信息</span>
        （例如：设备信息、操作行为日志信息）。
        <span className="text-primary-light">
          当您通过我方平台使用小程序服务时，您的信息将适用小程序开发者及技术服务提供方的隐私权协议，建议您在接受相关服务前阅读并确认理解相关协议。
        </span>
      </p>
      <p className="mb-10">
        对我们与之共享用户信息的公司、组织和个人，我们会与其签署严格的保密协议以及信息保护约定，要求他们按照我们的说明、本隐私权协议以及其他任何相关的保密和安全措施来处理用户信息。
      </p>

      <h4 className="text-2xl mb-8">转让</h4>
      <p className="mb-5 font-bold">
        我们不会将您的用户信息转让给任何公司、组织和个人，但以下情况除外：
      </p>
      <ul className="list-primary mb-10">
        <li>
          在<span className="text-primary-light">获取明确同意</span>
          的情况下转让：获得您的明确同意后，我们会向其他方转让您的用户信息
        </li>
        <li>
          在e 校优才与其他法律主体者发生
          <span className="text-primary-light">合并、收购或破产清算</span>
          情形，或其他<span className="text-primary-light">涉及合并、收购或破产清算</span>
          情形时，如涉及到用户信息
          转让，我们会要求新的持有您用户信息的公司、组织继续受本协议的约束，否则我们将要求该公司、组织和个人重新向您征求
          授权同意。
        </li>
      </ul>
      <h4 className="text-2xl mb-8">公开披露</h4>
      <p className="mb-10">
        我们仅会在
        <span className="text-primary-light">
          基于法律法规、法律程序、诉讼或政府主管部门强制性要求下，
        </span>
        且<span className="text-primary-light">采取符合法律和业界标准的安全防护措施</span>
        的前提下，才会公开披露您的个人信息。但我们保证，在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件。
      </p>

      <h4 className="text-2xl mb-5">共享、转让、公开披露用户信息时事先征得授权同意的例外</h4>
      <p className="mb-8 font-bold">
        以下情形中，共享、转让、公开披露您的用户信息无需事先征得您的授权同意：
      </p>
      <ul className="list-primary">
        <li>与国家安全、国防安全有关的</li>
        <li>与公共安全、公共卫生、重大公共利益有关的</li>
        <li>与犯罪侦查、起诉、审判和判决执行等有关的</li>
        <li>出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的</li>
        <li>从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道</li>
      </ul>
      <div className="divider my-14"></div>
      <h3 className="text-3xl mb-10">用户业务数据</h3>
      <h4 className="text-2xl mb-8">
        不同于您的用户信息，对于用户业务数据和公开信息，e 校优才将按如下方式处理：
      </h4>
      <p className="mb-5 font-bold">用户业务数据</p>
      <ul className="list-primary">
        <li>
          您通过e
          校优才提供的服务，加工、存储、上传、下载、分发以及通过其他方式处理的数据，均为您的用户业务数据，您
          <span className="text-primary-light">完全拥有您的用户业务数据</span>
          。e校优才作为云服务提供商，我们只会严格执行您的指示处理您的业务数据，除按与您协商一致或执行明确的法律法规要求外，不对您的业务数据进行任何非授权的使用或披露。
        </li>
        <li>
          您应<span className="text-primary-light">对您的用户业务数据来源及内容负责</span>，e
          校优才提示您谨慎判断数据来源及内容的合法性。因您的用户业务数据内容违反法律法规、部门规章或国家政策而造成的全部结果及责任均由您自行承担。
        </li>
      </ul>
      <p className="mb-5">
        根据您与e 校优才协商一致，e 校优才在您选定的数据中心存储用户业务数据。e
        校优才恪守对用户的安全承诺，根据适用的法律保护用户存储在e 校优才数据中心的数据。
      </p>
      <p className="mb-5 font-bold">公开信息</p>
      <p>
        公开信息是指<span className="text-primary-light">您公开分享的任何信息</span>
        ，任何人都可以在使用和未使用e
        校优才网站服务期间查看或访问这些信息。我们仅会在基于法律法规、法律程序、诉讼或政府主管部门强制性要求的情况下，且采取符合法律和业界标准的安全防护措施的前提下，才会公开披露您的个人信息。但我们保证，在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件。
      </p>
      <div className="divider my-14"></div>
      <h3 className="text-3xl mb-10">您如何管理您的用户信息</h3>
      <h4 className="text-2xl mb-8">个人信息的访问和更正</h4>
      <p className="mb-5 font-bold">您可通过以下途径访问或更正您的个人信息</p>
      <p>
        账号信息：登录账号访问“<span className="text-primary-light">个人中心</span>
        ”，查看或修改账号基本信息；您的部分个人信息仅能够通过管理员变更/导入，对此您表示理解和同意。
      </p>

      <h4 className="text-2xl my-8">个人信息的访问和更正</h4>
      <p className="mb-5 font-bold">
        您可通过上一条列明的方式删除您的部分个人信息，此外您还可通过下列情形向我们提出删除个人信息的请求：
      </p>

      <ul className="list-primary">
        <li>我们处理个人信息的行为违反法律法规</li>
        <li>我们收集、使用您的个人信息，未征得您的同意</li>
        <li>我们处理个人信息的行为或方式严重违反了本隐私协议的约定</li>
        <li>我们停止运营和服务</li>
      </ul>
      <div className="divider my-14"></div>
      <h3 className="text-3xl mb-10">我们如何使用Cookie和同类技术</h3>
      <ul className="list-primary">
        <li>
          为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储名为
          Cookie 的小数据文件。Cookie 通常包含标识符、站点名称以及一些号码和字符。e 校优才只能读取e
          校优才提供的 Cookie
        </li>
        <li>
          借助于 Cookie
          ，能够存储您的偏好或购买清单中的商品等数据。当下一次您再次访问的时候，我们将显示您需要的信息；或由e
          校优才通过 Cookie文件来辨识您的来源网站，以便e 校优才能追踪广告效果
        </li>
        <li>
          您可根据自己的偏好管理 Cookie ，您也可以清除计算机上保存的所有Cookies
          。大部分网络浏览器都设有阻止 Cookie
          的功能。但如果您这么做，则需要在每一次访问我们的网站时更改用户设置。如需详细了解如何更改浏览器设置，请访问您使用的浏览器的相关设置页面。
        </li>
        <li>
          除 Cookie
          外，我们还会在网站上使用网站信标和像素标签等其他同类技术。例如，我们向您发送的电子邮件可能含有链接至我们网站内容的地址链接，如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好以便于我们主动改善客户服务体验。
        </li>
      </ul>
      <div className="divider my-14"></div>
      <h3 className="text-3xl mb-10">我们如何保护和保存您的用户信息</h3>
      <ul>
        <li>
          e校优才非常重视您的信息安全。我们努力采取各种合理的物理、电子和管理方面的安全措施来保护您的用户信息。防止用户信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。例如，我们对e校优才网站提供
          <span className="text-primary-light">HTTPS协议安全浏览方式</span>；我们会使用
          <span className="text-primary-light">加密技术</span>
          提高用户信息的安全性；我们会使用受信赖的
          <span className="text-primary-light">保护机制</span>
          防止用户信息遭到恶意攻击；我们会部署访问
          <span className="text-primary-light">控制机制</span>
          ，尽力确保只有授权人员才可访问用户信息；以及我们会举办
          <span className="text-primary-light">安全和隐私保护培训课程</span>
          ，加强员工对于保护用户信息重要性的认识。
        </li>
        <li>
          我们会采取合理可行的措施，尽力避免收集无关的用户信息。我们只会在
          <span className="text-primary-light">达成本协议所述目的所需的期限内</span>
          保留您的用户信息，除非受到法律的允许。超出上述用户信息保存期限后，我们会对您的个人信息进行
          <span className="text-primary-light">删除或匿名化处理</span>。
        </li>
        <li>
          请<span className="text-primary-light">使用复杂密码</span>
          ，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。如果我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。
        </li>
        <li>
          在不幸发生用户信息安全事件（泄露、丢失等）后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知用户信息主体时，我们会采取合理、有效的方式发布公告。
        </li>
        <li>同时，我们还将按照监管部门要求，上报用户信息安全事件的处置情况</li>
        <li>
          我们将收集到的您的用户信息存放在中华人民共和国境内，如在符合适用法律规定的情形下因业务需要向境外传输个人信息的，我们会事先征得您的同意，并向您告知用户信息出境的目的、接收方、安全保障措施、安全风险等情况。
        </li>
        <li>
          如出现e
          校优才产品和服务停止运营的情形，我们会采取合理措施保护您用户信息安全，包括及时停止继续收集用户信息的活动；停止运营的通知将以逐一送达或公告的形式通知用户；并对所持有的个人信息进行删除或匿名化处理等
        </li>
      </ul>
      <div className="divider my-14"></div>
      <h3 className="text-3xl mb-10">未成年用户信息的特别约定</h3>
      <ul>
        <li>
          我们主要面向<span className="text-primary-light">成人</span>
          提供产品和服务。如您为未成年人，我们要求您请您的
          <span className="text-primary-light">父母或监护人</span>
          仔细阅读本隐私权协议，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。
        </li>
        <li>
          对于<span className="text-primary-light">经父母或监护人同意</span>
          使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。
        </li>
      </ul>
      <div className="divider my-14"></div>
      <h3 className="text-3xl mb-10">隐私协议的更新</h3>
      <ul className="list-primary">
        <li>我们的隐私协议可能修订。</li>
        <li>未经您明确同意，我们不会限制您按照本隐私协议所应享有的权利。</li>
        <li>
          对于重大修订，我们还会提供更为显著的通知（包括对于某些服务，我们会通过
          <span className="text-primary-light">网站公示</span>的方式进行通知甚至向您提供
          <span className="text-primary-light">弹窗提示</span>，说明隐私权协议的具体变更内容）。
        </li>
      </ul>
      <p className="mt-8 mb-5 font-bold">本协议所指的重大变更包括但不限于：</p>
      <ul className="list-primary">
        <li>我们在控制权、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等</li>
        <li>用户信息共享、转让或公开披露的主要对象发生变化</li>
        <li>您参与用户信息处理方面的权利及其行使方式发生重大变化</li>
        <li>我们负责处理用户信息安全的责任部门、联络方式及投诉渠道发生变化时</li>
        <li>用户信息安全影响评估报告表明存在高风险时</li>
      </ul>
      <div className="divider my-14"></div>
      <h3 className="text-3xl mb-10">如何联系我们</h3>
      <p>
        您对本声明和协议内容有任何疑问和意见，或者您对e校优才对本隐私权协议的实践以及操作上有任何疑问和意见，您可以登录e校优才官网，点击首页下方“联系我们”与我们联系，我们将在15天内回复您的请求。
      </p>
    </div>
  );
}
