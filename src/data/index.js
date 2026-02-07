// Data exports for the Game Night Controller
export { default as chaos } from './chaos.js';
export { default as geography } from './geography.js';
export { default as history } from './history.js';
export { default as logos } from './logos.js';
export { default as maths } from './maths.js';
export { default as memes } from './memes.js';
export { default as music } from './music.js';
export { default as prices } from './prices.js';
export { default as riddles } from './riddles.js';
export { default as spelling } from './spelling.js';
export { default as zoomed } from './zoomed.js';

// New party game modes
export { default as partyModes } from './partyModes.js';
export { default as icebreakers } from './icebreakers.js';

// Individual exports from chaos for easy access
export {
  forfeits,
  challenges,
  physicalChallenges,
  truthQuestions,
  dareChallenges,
  groupChallenges,
  drinkingGames,
  rewards,
  gameModes
} from './chaos.js';

// Individual exports from partyModes
export {
  charadesPrompts,
  pictionaryPrompts,
  wouldYouRather,
  neverHaveIEver,
  mostLikelyTo,
  speechTopics,
  accentChallenges,
  quickFireTrivia
} from './partyModes.js';

// Individual exports from icebreakers
export {
  quickQuestions,
  twoTruthsPrompts,
  conversationStarters,
  gettingToKnowYou,
  iceBreakerWYR,
  thisOrThat,
  rapidFire,
  neverHaveIEverLight
} from './icebreakers.js';
