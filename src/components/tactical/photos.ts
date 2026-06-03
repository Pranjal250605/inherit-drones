/* Photographs carried over from the standard variant. Vite resolves each
   import to a hashed URL string. Single source of truth for the tactical
   variant so every section references the same assets. */
import droneSpraying from "../../assets/drone-spraying.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import teamNapa from "../../assets/team-napa.jpg";

export const PHOTOS = {
  droneSpraying,
  hiroshimaAerial,
  teamNapa,
} as const;

export type PhotoKey = keyof typeof PHOTOS;
