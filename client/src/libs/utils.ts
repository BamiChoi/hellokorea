export function addClassnames(...classnames: string[]) {
  return classnames.join(" ");
}

function cleanViewsHistory(history: string) {
  const historyArray = history.split(",");
  const LIMIT = 100;
  if (historyArray.length === LIMIT) {
    historyArray.pop();
  }
  return historyArray.join();
}

export function addViewHistory(postId: string, history: string | null) {
  if (history) {
    const isInclude = history.includes(postId);
    if (!isInclude) {
      const cleanedHistory = cleanViewsHistory(history);
      const newHistory = `${postId},${cleanedHistory}`;
      localStorage.setItem("views_history", newHistory);
    } else return false;
  } else {
    localStorage.setItem("views_history", postId);
  }
  return true;
}
