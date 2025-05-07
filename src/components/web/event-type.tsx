import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/utils";

const fallbackImages = [
  "/event1.jpg?height=200&width=400",
  "/event2.jpg?height=200&width=400",
  "/event3.jpg?height=200&width=400",
  "/event2.jpg?height=200&width=400",
  "/event1.jpg?height=200&width=400",
];

export function EventType({ title, description, amount }: { title: string; description: string; amount: number }) {
  const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    return (
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="flex-shrink-0">
          <Image className="h-48 w-full object-cover" src={randomImage} alt={title} width={400} height={200} />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-3 text-base text-gray-500">{description}</p>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full justify-center">
              <span className="text-lg font-semibold text-gray-900">{formatMoney(amount)}</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  