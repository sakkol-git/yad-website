export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://yadkh.org/#website",
    url: "https://yadkh.org",
    name: "YAD Cambodia",
    description:
      "Youth Advancement for Development (YAD) is a leading NGO in Cambodia focused on youth empowerment, digital innovation, and community education.",
    publisher: {
      "@id": "https://yadkh.org/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://yadkh.org/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
