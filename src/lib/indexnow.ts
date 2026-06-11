export async function notifyIndexNow(urls: string[]) {
  if (!process.env.INDEXNOW_KEY) {
    console.warn("INDEXNOW_KEY is not defined. Skipping IndexNow ping.");
    return;
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'yadkh.org',
        key: process.env.INDEXNOW_KEY,
        keyLocation: `https://yadkh.org/${process.env.INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (!response.ok) {
      console.error(`IndexNow ping failed: ${response.statusText}`);
    } else {
      console.log(`IndexNow ping successful for ${urls.length} URLs.`);
    }
  } catch (error) {
    console.error("Failed to execute IndexNow ping:", error);
  }
}
