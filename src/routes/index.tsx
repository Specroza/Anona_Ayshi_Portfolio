import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { ScrollButton } from "@/components/scroll-button";

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Automation } from "@/components/sections/automation";

import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { profile } from "@/data/portfolio";

const title = "Anona Ayshi Rozario — Software QA Engineer Portfolio";
const description =
  "QA Engineer in Dhaka specialising in manual, functional, REST API and Playwright automation testing. 75+ defects reported in Jira across e-commerce, booking and portfolio applications.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          email: `mailto:${profile.email}`,
          address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
          sameAs: [profile.linkedin, profile.github],
          knowsAbout: [
            "Software Quality Assurance",
            "Manual Testing",
            "REST API Testing",
            "Test Automation",
            "Playwright",
            "Postman",
            "Jira",
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <ScrollButton />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Automation />

        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
