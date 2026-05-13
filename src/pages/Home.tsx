import { useState, useCallback } from 'react'
import OpeningCurtain from '../sections/OpeningCurtain'
import Navigation from '../sections/Navigation'
import HeroCoupleReveal from '../sections/HeroCoupleReveal'
import Invitation from '../sections/Invitation'
import DateCalendar from '../sections/DateCalendar'
import Venue from '../sections/Venue'
import Timeline from '../sections/Timeline'
import DressCode from '../sections/DressCode'
import Wishes from '../sections/Wishes'
import GuestForm from '../sections/GuestForm'
import Contacts from '../sections/Contacts'
import CountdownTimer from '../sections/CountdownTimer'
import Footer from '../sections/Footer'
import ScrollingText from '../sections/ScrollingText';


export default function Home() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false)

  const handleCurtainOpen = useCallback(() => {
    setIsCurtainOpen(true)
  }, [])

  return (
    <>
      {/* Opening curtain overlay */}
      <OpeningCurtain onOpen={handleCurtainOpen} />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero — Couple reveal with speech bubbles */}
        <HeroCoupleReveal isActive={isCurtainOpen} />

        <ScrollingText />

        {/* Invitation text */}
        <Invitation />

        <ScrollingText />

        {/* Date calendar */}
        <DateCalendar />

        <ScrollingText />

        {/* Venue with parallax */}
        <Venue />

        <ScrollingText />

        {/* Timeline */}
        <Timeline />

        <ScrollingText />

        {/* Dress code */}
        <DressCode />

        <ScrollingText />

        {/* Wishes */}
        <Wishes />

        <ScrollingText />

        {/* Guest form */}
        <GuestForm />

        {/* Contacts */}
        <Contacts />

        {/* Countdown timer */}
        <CountdownTimer />

        
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
