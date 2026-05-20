import FallingPetals from "@/components/FallingPetals";
import HeartCursor from "@/components/HeartCursor";
import AudioPlayer from "@/components/AudioPlayer";
import HeroSection from "@/components/HeroSection";
import OpeningBlessing from "@/components/OpeningBlessing";
import Timeline from "@/components/Timeline";
import MomShowcase from "@/components/MomShowcase";
import InvitationCard from "@/components/InvitationCard";
import Gallery from "@/components/Gallery";
import NameGame from "@/components/NameGame";
import RSVPForm from "@/components/RSVPForm";
import BlessingWall from "@/components/BlessingWall";
import CountdownTimer from "@/components/CountdownTimer";
import Ending from "@/components/Ending";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      {/* Immersive background particle overlays & cursors */}
      <FallingPetals />
      <HeartCursor />
      <AudioPlayer />

      {/* Storytelling Flow Sections */}
      <HeroSection />
      
      <OpeningBlessing />
      
      <Timeline />
      
      <MomShowcase />
      
      <InvitationCard />
      
      <Gallery />
      
      <NameGame />
      
      <RSVPForm />
      
      <BlessingWall />
      
      <CountdownTimer />
      
      <Ending />
    </main>
  );
}

