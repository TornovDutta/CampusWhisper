// Sleek abstract avatar color mapping and initials generator (Strictly NO emojis)

const GRADIENTS = [
  "from-indigo-600 via-indigo-500 to-purple-600",
  "from-violet-600 via-purple-600 to-pink-600",
  "from-blue-600 via-cyan-600 to-teal-500",
  "from-emerald-600 via-teal-600 to-cyan-600",
  "from-amber-600 via-orange-600 to-rose-600",
  "from-rose-600 via-pink-600 to-purple-600",
  "from-cyan-600 via-blue-600 to-indigo-600",
  "from-fuchsia-600 via-purple-600 to-indigo-600",
];

export function getAvatarGradient(name = "Anonymous") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
}

export function getInitials(name = "Anonymous") {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
