import type React from 'react';
import { useRef } from 'react';
import { type noteType } from '@/utils/types';

export type useMusicBoxSoundsType = {
  [key in noteType]: React.MutableRefObject<HTMLAudioElement | null>;
};
export default function useMusicBoxSounds() {
  const sounds: useMusicBoxSoundsType = {
    do: useRef<HTMLAudioElement | null>(null),
    re: useRef<HTMLAudioElement | null>(null),
    mi: useRef<HTMLAudioElement | null>(null),
    fa: useRef<HTMLAudioElement | null>(null),
    sol: useRef<HTMLAudioElement | null>(null),
    la: useRef<HTMLAudioElement | null>(null),
    si: useRef<HTMLAudioElement | null>(null),
    hDo: useRef<HTMLAudioElement | null>(null),
  };
  return sounds;
}
