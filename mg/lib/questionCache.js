const CACHE_DURATION = 10 * 60 * 1000;
const questionCache = new Map();
const CLEANUP_INTERVAL = 5 * 60 * 1000;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const cleanupCache = () => {
  const now = Date.now();
  for (const [key, value] of questionCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      questionCache.delete(key);
    }
  }
};

if (typeof window !== 'undefined') {
  setInterval(cleanupCache, CLEANUP_INTERVAL);
}

async function fetchQuestions(categoryId, difficulty, amount) {
  const API_URL = categoryId === "any"
    ? `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`
    : `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}`;

  const res = await fetch(API_URL, { next: { revalidate: 180 } });

  switch (res.status) {
    case 429:
      throw new Error("Too many requests. Please try again later.");
    case 500:
      throw new Error("Internal server error. Please try again later.");
    case 404:
      return [];
  }

  if (!res.ok) throw new Error(`Failed to fetch questions: ${res.status}`);

  const data = await res.json();
  return data.results || [];
}

export async function getCachedQuestions(categoryId, difficulty, amount = 11, retries = 3, waitTime = 2000) {
  let actualDifficulty = difficulty;
  if (categoryId === "26" && difficulty !== "medium") {
    actualDifficulty = "medium";
  }

  const cacheKey = `${categoryId}-${actualDifficulty}-${amount}`;
  const cached = questionCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) return cached.data;

  try {
    const questions = await fetchQuestions(categoryId, actualDifficulty, amount);

    questionCache.set(cacheKey, { data: questions, timestamp: Date.now() });

    return questions;
  } catch (err) {
    if (retries > 0) {
      await wait(waitTime);
      return getCachedQuestions(categoryId, difficulty, amount, retries - 1, waitTime);
    }
    throw err;
  }
}