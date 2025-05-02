import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Music } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <Music className="h-6 w-6 text-jamroom-blue" />
          <span className="ml-2 text-xl font-bold">JAMSession</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Log In
          </Link>
          <Link to="/signup" className="text-sm font-medium hover:underline underline-offset-4">
            Sign Up
          </Link>
        </nav>
      </header>
      
      <main className="flex-1">
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  <span className="text-gradient">JAMSession</span>
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl text-muted-foreground">
                  Create and join virtual jam sessions with musicians from around the world.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link to="/create-room" className="flex items-center gap-2">
                    <Music className="w-4 h-4" />
                    Create a Jam Room
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Everything you need to jam online
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides all the tools you need to create, record, and share music with others in real-time.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="bg-primary/20 text-primary rounded-lg p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-base font-medium">Real-time Collaboration</h3>
                    <p className="text-sm text-muted-foreground">
                      Jam with musicians from anywhere in the world.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="bg-primary/20 text-primary rounded-lg p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-base font-medium">Scheduled Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Plan and organize your jam sessions in advance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="bg-primary/20 text-primary rounded-lg p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                      <circle cx="17" cy="7" r="5" />
                    </svg>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-base font-medium">High-Quality Audio</h3>
                    <p className="text-sm text-muted-foreground">
                      Crystal clear sound for the best jamming experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="bg-primary/20 text-primary rounded-lg p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      <path d="M5 3v4" />
                      <path d="M19 17v4" />
                      <path d="M3 5h4" />
                      <path d="M17 19h4" />
                    </svg>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-base font-medium">Recording & Mixing</h3>
                    <p className="text-sm text-muted-foreground">
                      Record your sessions and mix them right in the browser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2023 JAMSession. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
