import { EventType } from "@/components/web/event-type";
import Footer from "@/components/web/footer";
import Hero from "@/components/web/hero";
import Navbar from "@/components/web/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      <main className="flex-grow">
        <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Event Services
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                We specialize in creating unforgettable experiences for all
                types of events.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <EventType
                title="Weddings"
                description="Create the wedding of your dreams with our expert planning and coordination."
                imageSrc="/event1.jpg?height=200&width=400"
              />
              <EventType
                title="Corporate Events"
                description="Impress clients and motivate teams with our professional corporate event services."
                imageSrc="/event2.jpg?height=200&width=400"
              />
              <EventType
                title="Birthday Parties"
                description="Celebrate another year with a birthday party that's tailored to your style."
                imageSrc="/event3.jpg?height=200&width=400"
              />
              <EventType
                title="Graduations"
                description="Mark this important milestone with a celebration that honors your achievements."
                imageSrc="/event2.jpg?height=200&width=400"
              />
              <EventType
                title="Concerts"
                description="From intimate gigs to large-scale productions, we've got your music event covered."
                imageSrc="/event1.jpg?height=200&width=400"
              />
              <EventType
                title="Memorial Services"
                description="Honor your loved ones with a dignified and memorable service."
                imageSrc="/event3.jpg?height=200&width=400"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
