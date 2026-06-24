const rawData = {
  biography: "english",
  khmer_biography: "khmer"
};
const csvToArray = (csv) => csv ? csv.split(',').map(s => s.trim()).filter(Boolean) : undefined;
function extractProfileData(rawData) {
  return {
    biography: rawData.biography || undefined,
    khmerBiography: rawData.khmer_biography || undefined,
    quote: rawData.quote || undefined,
    vision: rawData.vision || undefined,
    education: csvToArray(rawData.education),
    experience: csvToArray(rawData.experience),
    achievements: csvToArray(rawData.achievements),
    socialLinks: {
      linkedin: rawData.linkedin || undefined,
      twitter: rawData.twitter || undefined,
      facebook: rawData.facebook || undefined,
      github: rawData.github || undefined,
    }
  };
}
console.log(JSON.stringify(extractProfileData(rawData), null, 2));
