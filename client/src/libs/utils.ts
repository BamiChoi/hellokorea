export function addClassnames(...classnames: string[]) {
  return classnames.join(" ");
}

function cleanViewHistory(history: string) {
  const historyArray = history.split(",");
  const LIMIT = 100;
  if (historyArray.length === LIMIT) {
    historyArray.pop();
  }
  const cleanedHistory = historyArray.join();
  return cleanedHistory;
}

export function addViewHistory(postId: string, history: string) {
  const cleanedHistory = cleanViewHistory(history);
  const newHistory = `${postId!},${cleanedHistory}`;
  localStorage.setItem("view_history", newHistory);
}
