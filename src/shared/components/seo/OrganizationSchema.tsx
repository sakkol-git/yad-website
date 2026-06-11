export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'NGO', 'NonProfitOrganization'],
    '@id': 'https://yadkh.org/#organization',
    name: 'Youth Advancement for Development',
    alternateName: ['YAD Cambodia', 'YAD'],
    url: 'https://yadkh.org',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yadkh.org/assets/images/yad_logo.png',
      width: 512,
      height: 512,
    },
    image: 'https://yadkh.org/assets/images/yad_logo.png',
    description: 'Youth Advancement for Development (YAD) is a Cambodian NGO empowering youth to lead tomorrow through education, digital innovation, dormitory programs, and community development.',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phnom Penh',
      addressCountry: 'KH',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+855-99-332-289',
        contactType: 'customer support',
        email: 'jc.acekh@gmail.com',
        availableLanguage: ['English', 'Khmer'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61571829685466',
      'https://t.me/Youthadvancementfordevelopment',
    ],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Cambodia',
    },
    knowsAbout: ['Youth Empowerment', 'Digital Innovation', 'Education', 'Community Development'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Programs and Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dormitory & Youth Training',
            url: 'https://yadkh.org/programs',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Innovation',
            url: 'https://yadkh.org/programs',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Slum Community Education',
            url: 'https://yadkh.org/programs',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
