"use client";

import { EventType } from "@/components/web/event-type";
import Footer from "@/components/web/footer";
import Hero from "@/components/web/hero";
import Navbar from "@/components/web/navbar";
import { getOriginAllEvents } from "@/services/origin/originService";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const {
    data: originEvents,
    isLoading: isOriginEventsLoading,
    isError: isOriginEventsError,
  } = useQuery({
    queryKey: ["origin-events"],
    queryFn: () => getOriginAllEvents()
  });

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
              {originEvents?.data && originEvents.data.length > 0 ? (
                originEvents.data.map((event, index) => (
                  <EventType
                    key={index}
                    title={event.name}
                    description={event.description}
                    amount={event.amount}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No events available at the moment. Please check back later.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
