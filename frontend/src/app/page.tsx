'use client'
import { usePortfolio } from '@/hooks/usePortfolio'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import AchievementsSection from '@/components/sections/AchievementsSection'
import FeedbackSection from '@/components/sections/FeedbackSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  const { data, loading } = usePortfolio()
  if (loading) return <LoadingScreen />
  const vis = data?.sectionVisibility || {}

  return (
    <>
      {/* <CustomCursor /> */}
      <Navbar personal={data?.personal} />
      <main>
        <HeroSection personal={data?.personal} skills={data?.skills} projects={data?.projects} />
        {vis.skills     !== false && <SkillsSection     skills={data?.skills} />}
        {vis.projects   !== false && <ProjectsSection   projects={data?.projects} />}
        {vis.experience !== false && <ExperienceSection experience={data?.experience} />}
        {vis.achievements !== false && data?.achievements?.length > 0 && (
          <AchievementsSection achievements={data?.achievements} />
        )}
        {vis.feedback !== false && data?.feedback?.length > 0 && (
          <FeedbackSection feedback={data?.feedback} />
        )}
        {vis.contact !== false && <ContactSection personal={data?.personal} />}
      </main>
      <Footer personal={data?.personal} />
    </>
  )
}
