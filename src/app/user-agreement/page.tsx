import ProtocolPage from '@/components/home/ProtocolPage';

export default function UserAgreement() {
  return (
    <div>
      <ProtocolPage
        title="e校优才用户协议"
        publishDate="2024年8月1日"
        effectiveDate="2024年8月1日"
        content={<Content />}
        position={{ title: '用户协议', href: '/user-agreement' }}
      ></ProtocolPage>
    </div>
  );
}

function Content() {
  return (
    <div className="text-lg font-light text-default-700">
      <h3 className="text-3xl font-semibold mb-10">引言</h3>
      <div className="mb-8">
        在您成为e校优才注册用户，使用e校优才提供的服务之前，请您认真阅读
        <span className="text-primary-light">e校优才《用户协议》</span>
        （以下简称“协议”），更好地了解我们所提供的服务以及您享有的权利和承担的义务。
        <span className="text-primary-light">
          您一旦开始使用e校优才服务，即表示您已经确认并接受了本协议中的全部条款。
        </span>
      </div>
      <div>
        本协议系由您（以下简称“用户”或“您”）与
        <span className="text-primary-light">上海中智科技应用发展有限公司</span>
        （以下简称“我们”）基于e校优才平台（以下简称“本平台”或“e校优才”）所订立的相关权利义务规范。请您在注册、使用e校优才之前，认真阅读以下条款。
      </div>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">注册条款的接受</h3>
      <span className="text-primary-light"></span>
      <div>
        依据《网络安全法》《互联网用户账号信息管理规定》等法律法规的要求，
        <span className="text-primary-light">
          您在e校优才注册页面完成手机短信验证并勾选同意
          e校优才《用户协议》等相关协议，即表示您已经阅读并且同意与上海科技应用发展有限公司达成本协议，
        </span>
        成为e校优才的用户，并接受本协议中的全部注册条款以及
        e校优才《隐私政策》等各项协议或规则（统称“平台协议”或“平台规则”）的所有条款的约束，包括争议解决条款（详见本协议第十五条）。
      </div>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">用户的注册与认证</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          申请注册e校优才账号的用户应同时满足下列全部条件：在注册之日以及此后使用e校优才服务期间，个人用户必须以学习、个人测评及求职为目的；机构用户必须以学员管理、提供就业指导为目的。个人用户必须在机构用户的指引下创建及使用账号。
          <span className="text-primary-light">本平台不向任何单独的个人用户提供服务。</span>
        </li>
        <br />
        <li>
          依照《网络招聘服务管理规定》等相关法律法规的规定，
          <span className="text-primary-light">
            若用户提交的材料或提供的信息不准确、不真实、不规范或有理由怀疑证明材料涉及窃取、伪造的，e校优才有权拒绝为您提供相关功能。
          </span>
          您可能无法使用e校优才平台及相关服务或在使用过程中部分功能受到限制。
        </li>
        <br />
        <li>
          用户保证在填写、登录、使用账号信息资料时，不得有以下情形：
          <ol className="ps-5 mt-2 space-y-1 list-hl list-inside">
            <br />
            <li>违反宪法或法律法规规定的；</li>
            <li>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
            <li>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
            <li>损害国家荣誉和利益的，损害公共利益的；</li>
            <li>煽动民族仇恨、民族歧视，破坏民族团结的；</li>
            <li>破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
            <li>散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
            <li>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
            <li>侮辱或者诽谤他人，侵害他人合法权益的；</li>
            <li>含有法律、行政法规禁止的其他内容的。</li>
          </ol>
          <br />
          <span className="ps-5 text-primary-light">
            若用户登录、使用账号头像、个人简介等账号信息资料存在违法和不良信息的，e校优才平台有权采取通知限期改正、暂停使
            用等措施。
          </span>
        </li>
        <br />
        <li>
          若用户故意提供<span className="text-primary-light">虚假的身份信息、学校信息</span>
          进行注册，
          <span className="text-primary-light">发布虚假信息或者不良、违法信息，</span>
          视为严重违反本协议，
          <span className="text-primary-light">
            e校优才有权暂停或终止该用户账号并停止提供服务。
          </span>
          虚假注册、发布虚假信息给e校优才造成经济、名誉等任何损失的，
          <span className="text-primary-light">e校优才将保留追究该用户法律责任的权利。</span>
        </li>
      </ol>
      <br />

      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">用户账号及安全</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          <span className="text-primary-light">用户应对利用账号所进行的一切活动负全部责任，</span>
          包括任何经由e校优才上传、张贴、发送电子邮件或任何其它方式传送的资讯、资料、文字、软件、音乐、音讯、照片、图形、视讯、信息或其它资料，无论系公开还是私下传送，均由内容提供者承担责任。
        </li>
        <br />
        <li>
          用户的账号遭到未获授权的使用，或者发生其他任何安全问题时，用户应立即通知e校优才。
          <span className="text-primary-light">
            由于用户使用不当或者其他非因
            e校优才导致的账号泄露，进而导致其资料、信息泄露的，由用户承担其不利后果。
          </span>
        </li>
        <br />
        <li>
          e校优才账号的所有权归
          <span className="text-primary-light">上海中智科技应用发展有限公司</span>
          所有，用户完成账号注册程序后，获得e校优才账号的使用权，且该使用权仅属于账号初始注册人。同时，用户
          <span className="text-primary-light">不得赠与、借用、租用、转让或售卖</span>
          e校优才账号或者以其他方式许可他人使用e校优才账号。
          <span className="text-primary-light">
            其他人不得通过受赠、继承、承租、受让或者其他任何方式
          </span>
          使用e校优才账号。如果我们发现或者有合理理由认为账号使用者并非账号初始注册人，为保障账号安全与信息安全，我们有权立即暂停或终止向该注册账号提供服务，并有权永久禁用该账号，及禁止该账号所关联的手机号再次注册。
        </li>
        <br />
        <li>
          <span className="text-primary-light">
            用户不得将账号主动告知第三方或提供给第三方进行使用，
          </span>
          例如提供给第三方进行代为购买e校优才服务等。如因此造成其他用户隐私泄露或经济损失以及本平台损失的，用户应当承担全部责任。
        </li>
      </ol>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">服务说明</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          e校优才通过互联网为用户提供网络服务，包括在线及离线的相关业务。为使用网络服务，用户应自行配备进入互联网所必需的设备，包括计算机、数据机或其它存取装置，并自行支付登录互联网所需要的费用。
        </li>
        <br />
        <li>
          无论是付费服务还是e校优才的免费服务均有有效期，有效期结束后服务将自动终止。除协议另有约定外，因付费服务具有数字化商品的特殊属性，一经购买不支持七天无理由退货。
        </li>
        <br />
        <li>
          基于风控策略、求职安全及信息真实性的考虑，e校优才可能要求部分用户补充提供材料（包括但不限于
          <span className="text-primary-light">企业资质证明、承诺书、业务协议</span>
          等，）具体要求会在相关页面上做明确展示。
          <span className="text-primary-light">
            如用户拒绝提供前述材料，e校优才有权视情况暂停或终止向该用户提供部分或全部服务。
          </span>
        </li>
        <br />
        <li>
          对于利用e校优才平台从事非法活动，或言行（无论线上或者线下的），e校优才有权视情况暂停或终止为其提供部分或全部的服务。
          <span className="text-primary-light">
            若该行为给e校优才造成任何损失的，e校优才保留追究其法律责任的权利。
          </span>
        </li>
        <br />
        <li>
          e校优才有权通过滚动图、推送、拨打电话、发送短信或电子邮件等方式，告知用户e校优才服务相关的广告信息、促销优惠等营销信息，以及邀请用户参与版本测试、用户体验反馈、回访等活动。除系统通知或重要信息外，用户可以通过e校优才提供的方式选择不接收上述信息。
        </li>
        <br />
        <li>e校优才可能会使用关联平台或第三方合作平台的信息以增加招聘信息的广度。</li>
        <br />
        <li>
          用户应通过本平台使用相关服务；
          <span className="text-primary-light">
            未经许可，不得通过其他第三方工具或运营平台获取e校优才平台内的任何信息服务
          </span>
          ，包括但不限于通过第三方软件登录e校优才账号、接收测评、发布职位、浏览职位、收发简历等。如因用户使用第三方软件导致相关信息泄露的，e校优才不承担任何责任，且用户还应承担由此给e校优才造成的损失。
        </li>
        <br />
        <li>
          企业招聘用户若将在平台上获取的求职者简历向境外接收方提供，应按照《个人信息保护法》等相关法律法规采取必要措施确保个人信息出境合法合规。
        </li>
      </ol>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">有限责任条款</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          <span className="text-primary-light">
            e校优才将尽力为用户提供安全、及时、准确、高质量的服务，但无法对用户使用本平台服务的效果做出承诺，也不保证服务不会中断，对服务的及时性、安全性、准确性都不作保证。
          </span>
          除非另有约定，否则用户因无法使用e校优才服务，或使用服务未达到心理预期的，e校优才不承担责任。
        </li>
        <br />
        <li>
          对于用户通过e校优才提供的服务传送的内容，e校优才会尽合理努力按照国家有关规定严格审核。部分外部链接与获取的信息无法保证其内容的绝对准确、完整性及品质。如发现问题，
          <span className="text-primary-light">
            e校优才有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停使用软件/网站服务的全部或部分，保存有关记录，并根据国家法律法规、相关政策在必要时向有关机关报告并配合有关机关的行动。
          </span>
        </li>
        <br />
        <li>
          对于用户上传的照片、资料、证件、视频、内容及图片等，e校优才已采取相关措施并已尽合理努力进行审核，但
          <span className="text-primary-light">
            不保证其内容的正确性、合法性或可靠性，相关责任由上传上述内容的用户承担。
          </span>
        </li>
        <br />
        <li>
          <span className="text-primary-light">
            用户应对e校优才上的其他用户发布的内容自行加以判断，并承担因使用内容而引起的所有风险，
          </span>
          包括但不限于因对内容的正确性、完整性或实用性的依赖而产生的风险。e校优才无法且不会对因前述风险而导致的任何损失或损害承担责任。
        </li>
        <br />
        <li>
          <span className="text-primary-light">
            否使用软件/网站服务下载或取得任何资料应由用户自行考虑并自负风险
          </span>
          ，因任何资料的下载而导致的用户电脑系统的任何损坏或数据丢失等后果，e校优才不承担任何责任
        </li>
        <br />
        <li>
          对于e校优才在线上或线下策划、发起、组织或是承办的任何招聘相关的活动，
          <span className="text-primary-light">
            e校优才不对上述招聘效果向用户作出任何保证或承诺，也不担保活动期间用户自身行为的合法性、合理性。
          </span>
          由此产生的任何对于用户个人或者他人的人身或者是名誉以及其他损害，应由行为实施主体承担责任。
        </li>
        <br />
        <li>
          对于用户的投诉，e校优才将尽合理努力进行核实和处理，履行平台的管理义务。根据国家相关法律法规的规定，
          <span className="text-primary-light">
            e校优有权决定是否向公众或被投诉者公开投诉内容。
          </span>
        </li>
      </ol>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">用户的个人信息权利</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          <span className="text-primary-light">e校优才依法对用户的个人信息及隐私进行保护。</span>
        </li>
        <br />
        <li>
          用户对于自己的个人信息享有包括但不限于以下权利：
          <ol className="ps-5 mt-2 space-y-1 list-hl list-inside">
            <br />
            <li>
              <span className="text-primary-light">随时查询及请求阅览</span>
              ，但因极少数特殊情况无法查询及提供阅览的除外；
            </li>
            <br />
            <li>
              <span className="text-primary-light">时请求补充或更正</span>
              ，但因极少数特殊情况无法补充或更正的除外。
            </li>
          </ol>
        </li>
        <br />
        <li>
          有关隐私政策的内容具体详见
          <span className="text-primary-light">e校优才《隐私政策》。</span>
        </li>
      </ol>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">用户的平台使用义务</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          本协议所称“平台使用”是指用户使用本平台服务所进行的任何行为，包括但不限于
          <span className="text-primary-light">
            注册、登录、认证、账号管理、发布招聘信息、邀约面试以及其他通过e校优才在本平台所进行的一切行为。
          </span>
        </li>
        <br />
        <li>
          用户在使用e校优才服务时，应遵守中国通行法律法规以及适用的特定行业法律法规，包括但不限于《中华人民共和国民法典》、《中华人民共和国个人信息保护法》、《中华人民共和国网络安全法》、《中华人民共和国数据安全法》、《中华人民共和国就业促进法》、《中华人民共和国劳动法》、《中华人民共和国劳动合同法》、《中华人民共和国商标法》、《中华人民共和国著作权法》、《全国人民代表大会常务委员会关于维护互联网安全的决定》、《中华人民共和国保守国家秘密法》、《中华人民共和国电信条例》、《互联网信息服务管理办法》、《计算机信息网络国际联网安全保护管理办法》、《中华人民共和国计算机信息系统安全保护条例》、《中华人民共和国计算机信息网络国际联网管理暂行规定》、《网络招聘服务管理规定》、《计算机信息系统国际联网保密管理规定》、《网络信息内容生态治理规定》、《互联网用户账号名称管理规定》。
        </li>
        <br />
        <li>
          <span className="text-primary-light">
            禁止用户通过e校优才平台制作、发送、复制、发布、传播违反《互联网信息服务管理办法》等国家相关法律法规的内容，
          </span>
          <span className="font-semibold">包括但不限于：</span>
          <ol className="ps-5 mt-2 space-y-1 list-hl list-inside">
            <br />
            <li>反对宪法所确定的基本原则的；</li>
            <br />
            <li>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
            <br />
            <li>损害国家荣誉和利益的；</li>
            <br />
            <li>煽动民族仇恨、民族歧视，破坏民族团结的；</li>
            <br />
            <li>破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
            <br />
            <li>散布谣言、扰乱社会秩序、破坏社会稳定的；</li>
            <br />
            <li>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
            <br />
            <li>侮辱或者诽谤他人，侵害他人合法权益的；</li>
            <br />
            <li>
              含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或有悖道德、令人反感的内容的；
            </li>
            <br />
            <li>
              含有中国法律、法规、规章、条例以及任何具有法律效力的规范所限制或禁止的其他内容的。
            </li>
          </ol>
        </li>
        <br />
        <li>
          <span className="font-semibold">禁止用户通过e校优才平台制作、发布、传播以下信息：</span>
          <ol className="ps-5 mt-2 space-y-1 list-hl list-inside">
            <br />
            <li>
              涉及<span className="text-primary-light">招聘未成年人</span>等内容；
            </li>
            <br />
            <li>
              涉及<span className="text-primary-light">传销或直销、广告（寻求合作）</span>等内容；
            </li>
            <br />
            <li>
              涉及<span className="text-primary-light">色情、淫秽</span>等内容；
            </li>
            <br />
            <li>
              涉及<span className="text-primary-light">违法/政治敏感</span>等内容；
            </li>
            <br />
            <li>
              涉及<span className="text-primary-light">虚假信息</span>
              ，包括但不限于不真实的公司信息、薪资、个人简历、职位信息等；
            </li>
            <br />
            <li>
              涉及<span className="text-primary-light">虚假职位</span>
              ，包括但不限于发布的职位信息与其实际招聘的职位不符等。
            </li>
          </ol>
        </li>
        <li>
          <span className="font-semibold">禁止利用e校优才平台从事</span>
          <span className="text-primary-light">损害其他用户或e校优才合法权益的行为，</span>
          包括但不限于：
          <ol className="ps-5 mt-2 space-y-1 list-hl list-inside">
            <br />
            <li>
              冒充任何人或机构，包含但不限于冒充e校优才工作人员或以虚假或不实的方式陈述或谎称与任何人或机构有关系的；
            </li>
            <br />
            <li>跟踪或以其它方式骚扰其他用户的；</li>
            <br />
            <li>
              未经合法授权
              <span className="text-primary-light">
                截获、篡改、收集、储存或删除他人信息、电子邮件或数据资料，
              </span>
              或将已获知的此类资料<span className="text-primary-light"></span>用于任何非法
              或不正当目的的；
            </li>
            <br />
            <li>
              未经e校优才许可，
              <span className="text-primary-light">
                使用插件、外挂或通过其他第三方工具、运营平台或任何服务接入本服务或系统获取相关数据或
                或信息的。
              </span>
            </li>
          </ol>
        </li>
        <li>
          <span className="font-semibold">
            禁止用户从事危害e校优才平台生态的行为，包括但不限于：
          </span>
          <ol className="ps-5 mt-2 space-y-1 list-hl list-inside">
            <br />
            <li>招聘他人从事违法活动；</li>
            <li>以培训费、服装费等名义骗取求职者财物；</li>
            <li>恶意骚扰其他用户；</li>
            <li>
              用户
              <span className="text-primary-light">
                使用虚假身份信息/公司信息/学校信息进行注册或认证、发布虚假招聘或求职信息、发布含有传销、色情、反动
                等严重违法内容、对外传播面试聊天等通讯记录、拖欠大量员工薪资的，
              </span>
              均视为严重违反本协议。
            </li>
          </ol>
        </li>
        <li>
          <span className="font-semibold">
            禁止用户利用e校优才平台从事其他的违法行为，包括但不限于：
          </span>
          <ol className="ps-5 mt-2 space-y-1 list-hl list-inside">
            <br />
            <li>
              利用e校优才提供的AI功能制造
              <span className="text-primary-light">违反国家法律的内容</span>等行为；
            </li>
            <br />
            <li>
              <span className="text-primary-light">冒用、混淆</span>
              他人账号的昵称、头像、企业介绍发布招聘信息的，或
              <span className="text-primary-light">冒充、 利用他人名义</span>对外招聘的；
            </li>
            <br />
            <li>
              未经e校优才的许可自行或授权、允许、协助任何第三人对平台内的任何信息内容进行非法获取；“非法获取”是指采用
              包括但不限于“蜘蛛”（spider）程序、爬虫程序、拟人程序等
              <span className="text-primary-light">非真实用户</span>
              或避开、破坏技术措施等
              <span className="text-primary-light">非正常浏览的手段、 方式</span>
              ，读取、复制、转存、获得数据和信息内容的行为；
            </li>
            <br />
            <span>
              用户违反上述任意一项规定的均构成违约，e校优才有权按照
              <span className="text-primary-light">本协议第八条</span>
              的约定对其采取处置措施并追究其违约责任。
            </span>
          </ol>
        </li>
      </ol>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">违约责任</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          若e校优才查实或有合理理由认为用户违反本协议第七条的，e校优才有权对其采取
          <span className="text-primary-light">删除、屏蔽相关信息、限制其使用部分或全部功能</span>
          等处理措施；为防止损失的进一步扩大，
          <span className="text-primary-light">
            e校优才有权视情况紧急及严重程度，在不经事先通知的情况下暂停或终止向该用户提供部分或全部服务。
          </span>
          如用户的违约行为导致e校优才遭受任何损失的，
          <span className="text-primary-light">e校优才有权要求该用户向e校优才赔 偿全部损失。</span>
        </li>
        <br />
        <li>
          如用户的违约行为导致任何第三人对e校优才提出任何索赔或请求的，
          <span className="text-primary-light">用户应当赔偿e校优才或其他合作伙伴的损失，</span>
          包括但不限于赔偿金、律师费、合理的调查费等相关费用。
        </li>
        <br />
        <li>
          用户投诉其他用户时若有不实投诉的行为，投诉者应承担其所产生的全部法律责任。如侵犯他人的合法权益，投诉人应独立承担全部法律责任。如给e校优才造成损失的，投诉人应对e校优才承担相应的赔偿责任。
        </li>
      </ol>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">关于用户在e校优才上传或张贴的内容</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          <span className="text-primary-light">用户在e校优才上传或张贴的内容</span>
          （包括但不限于照片、文字、备注及评价等），
          <span className="text-primary-light">
            视为用户授予上海中智科技应用发展有限公司及其关联公司免费、非独家的使用权，e校优才有权为展示、传播及推广前述张贴内容的目的，对上述内容进行脱敏处理后发布。
          </span>
          该使用权持续至用户书面通知e校优才不得继续使用，且e校优才实际收到该等书面通知时止。
        </li>
        <br />
        <li>
          因用户上传或张贴的内容侵犯他人权利，导致任何第三方向e校优才提出侵权或索赔要求的，
          <span className="text-primary-light">用户应承担全部责任。</span>
        </li>
        <br />
        <li>
          任何第三方对于用户在e校优才的公开使用区域张贴的内容进行
          <span className="text-primary-light">复制、修改、编辑、传播</span>
          等行为的，该行为产生的法律后果和责任
          <span className="text-primary-light">均由行为人承担</span>，与e校优才无关。
        </li>
      </ol>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">本协议条款的变更和修改</h3>
      <div>
        <span className="text-primary-light">
          校优才有权在必要时通过在网页上发出公告等合理方式修改本协议。
        </span>
        用户在使用本产品或服务时，应当及时查阅了解修改的内容，并自觉遵守本服务协议的相关内容。用户如继续使用本产品或本服务协议涉及的服务，则视为已接受了修改后的协议，
        <span className="text-primary-light">当发生有关争议时，以最新的服务协议为准；</span>
        用户在不同意修改内容的情况下，应当
        <span className="text-primary-light">停止使用本服务协议涉及的产品或服务。</span>
      </div>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">不可抗力</h3>
      <ol className="list-decimal	 list-inside">
        <li>
          “<span className="text-primary-light">不可抗力</span>
          ”是指e校优才不能合理控制、不可预见或即使预见亦无法避免的事件，该事件妨碍、影响或延误e校优才根据本注册条款履行其全部或部分义务。该事件包括但不限于政府行为、自然灾害、战争、黑客袭击、电脑病毒、网络故障等。不可抗力可能导致e校优才无法访问、访问速度缓慢、存储数据丢失、用户个人信息泄露等不利后果。
        </li>
        <br />
        <li>
          遭受不可抗力事件时，e校优才
          <span className="text-primary-light">
            可中止履行本协议项下的义务直至不可抗力的影响消除为止，并且不因此承担违约责任
            ；但应尽最大努力克服该事件，减轻其负面影响。
          </span>
        </li>
      </ol>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">通知</h3>
      <div>
        e校优才向其用户发出的通知，将采用
        <span className="text-primary-light">系统消息、弹窗、电子邮件或页面公告</span>
        等形式。本《用户协议》的条款修改或其他事项变更时，e校优才可以以上述形式进行通知。
      </div>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">法律的适用和管辖</h3>
      <div>
        本协议的生效、履行、解释及争议的解决均适用中华人民共和国的现行法律，本协议的签订地为中华人民共和国上海市徐汇区。若您与e校优才发生任何争议，双方应尽量友好协商解决，如协商不成，您同意应将争议提交至本协议签订地的人民法院诉讼解决。本协议因与中华人民共和国现行法律相抵触而导致部分条款无效的，不影响其他条款的效力。
      </div>
      <div className="divider my-14"></div>
      <h3 className="text-3xl font-semibold mb-10">如何联系我们</h3>
      <div>
        您对本声明和协议内容有任何疑问和意见，或者您对e校优才对本用户协议的实践以及操作上有任何疑问和意见，您可以
        <span className="text-primary-light">
          登录e校优才官网，点击首页下方“联系我们”与我们联系，我们将在15天内回复您的请求。
        </span>
      </div>
    </div>
  );
}
