export const chooseRandom = <T,>(items: readonly T[]): T | undefined => items.length ? items[Math.floor(Math.random() * items.length)] : undefined;
// export const createId = () => crypto.randomUUID();
export function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}
