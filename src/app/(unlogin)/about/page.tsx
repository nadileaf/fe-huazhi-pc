import Banner from '@/components/unlogin/about/Banner';
import Introduction from '@/components/unlogin/about/Introduction';
import FiveE from '@/components/unlogin/about/FiveE';
import Advantages from '@/components/unlogin/about/Advantages';
import Text from '@/components/unlogin/about/Text';

export default function About() {
  return (
    <div className="w-full bg-[#f9f9f9]">
      <Banner></Banner>
      <Introduction></Introduction>
      <FiveE></FiveE>
      <Advantages></Advantages>
      <Text></Text>
    </div>
  );
}
