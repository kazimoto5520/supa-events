import Image from "next/image";
import { Button } from "../ui/button";

export function EventType({ title, description, imageSrc }: { title: string; description: string; imageSrc: string }) {
    return (
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="flex-shrink-0">
          <Image className="h-48 w-full object-cover" src={imageSrc} alt={title} width={400} height={200} />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-3 text-base text-gray-500">{description}</p>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full justify-center">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    )
  }
  