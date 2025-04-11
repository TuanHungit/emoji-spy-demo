import { EmojiData } from '../types';

const emojiCategories = [
  ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦝'],
  ['🦁', '🐯', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦊'],
  ['🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🦊'],

  ['🐴', '🦄', '🦓', '🦌', '🦬', '🐮', '🐂', '🐃', '🐄', '🦊'],
  ['🦆', '🦢', '🦉', '🦤', '🦩', '🦚', '🦜', '🦃', '🐓', '🦊'],
  ['🦋', '🐛', '🐜', '🐝', '🪲', '🐞', '🦗', '🪳', '🕷️', '🦊'],

  ['🐺', '🦊', '🦝', '🐕', '🦮', '🐩', '🐶', '🐆', '🐅', '🦝'],
  ['🐈', '🐱', '🐆', '🐅', '🐯', '🦁', '🐒', '🦧', '🦮', '🦊'],
  ['🦓', '🦄', '🐴', '🐎', '🦙', '🦌', '🦬', '🐮', '🐑', '🦊'],
];

const similarEmojis: Record<string, string[]> = {
  '🐶': ['🐕', '🦮', '🐩', '🐺'], // Dog variations
  '🐱': ['🐈', '🦁', '🐯', '🐆'], // Cat variations
  '🐭': ['🐹', '🐀', '🐿️', '🦫'], // Small rodent variations
  '🦊': ['🐺', '🦝', '🐕', '🐩'], // Fox variations
  '🐻': ['🐨', '🐼', '🦝', '🦦'], // Bear variations
  '🐴': ['🦄', '🦓', '🦙', '🐎'], // Horse variations
  '🐮': ['🐄', '🐂', '🐃', '🦬'], // Cow variations
  '🦁': ['🐯', '🐆', '🐅', '🐱'], // Lion variations
  '🐸': ['🐊', '🐢', '🦎', '🐉'], // Amphibian/reptile variations
  '🦝': ['🦊', '🐺', '🦡', '🐿️'], // Raccoon variations
};

const getSlightVariation = (emoji: string, level: number): string => {
  const variations = similarEmojis[emoji] || [];

  if (variations.length === 0) {
    const categoryIndex = emojiCategories.findIndex((category) =>
      category.includes(emoji),
    );
    if (categoryIndex >= 0) {
      const category = emojiCategories[categoryIndex] ?? [];
      const otherEmojis = category.filter((e) => e !== emoji);
      if (otherEmojis.length > 0) {
        return (
          otherEmojis[Math.floor(Math.random() * otherEmojis.length)] || '🦊'
        );
      }
    }
    return emoji === '🦊' ? '🦝' : '🦊';
  }

  if (level >= 8) {
    return variations[0] || (emoji === '🦊' ? '🦝' : '🦊');
  } else if (level >= 5) {
    return variations[0] || (emoji === '🦊' ? '🦝' : '🦊');
  } else {
    return (
      variations[Math.floor(Math.random() * variations.length)] ||
      (emoji === '🦊' ? '🦝' : '🦊')
    );
  }
};

export const generateEmojis = (level: number): EmojiData[] => {
  const gridSize =
    level <= 2
      ? 9
      : level <= 4
      ? 16
      : level <= 6
      ? 25
      : level <= 8
      ? 36
      : level <= 10
      ? 49
      : level <= 12
      ? 64
      : 81;

  const categoryIndex = Math.min(
    Math.floor(level / 3),
    emojiCategories.length - 1,
  );

  const category = emojiCategories[categoryIndex] ?? [];

  const baseEmojiIndex = Math.floor(Math.random() * category.length);
  const baseEmoji = category[baseEmojiIndex] || '🦊';

  const emojis: EmojiData[] = Array(gridSize)
    .fill(null)
    .map(() => ({
      emoji: baseEmoji,
      isSpy: false,
    }));

  const spyPosition = Math.floor(Math.random() * gridSize);

  let spyEmoji = '';
  if (level >= 8) {
    spyEmoji =
      baseEmoji === '🦊'
        ? '🦝'
        : similarEmojis[baseEmoji]?.[0] ||
          emojiCategories[categoryIndex]?.find((e) => e !== baseEmoji) ||
          '🦊';
  } else {
    spyEmoji = getSlightVariation(baseEmoji, level);
  }

  emojis[spyPosition] = {
    emoji: spyEmoji,
    isSpy: true,
  };

  return emojis;
};
