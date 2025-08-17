"use client";
import { Skeleton } from "@/components/ui/skeleton"

export function ServicesSkeleton() {
  return (
    <section className="mx-auto">
      <div className="border rounded-lg p-4 space-y-4">
        
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" /> 
          <Skeleton className="h-8 w-8 rounded-md" /> 
        </div>

        
        <div className="space-y-3 mt-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center"
            >
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-24" /> 
                <Skeleton className="h-4 w-4" /> 
                <Skeleton className="h-4 w-16" /> 
              </div>

              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8 rounded-md" /> 
                <Skeleton className="h-8 w-8 rounded-md" /> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
