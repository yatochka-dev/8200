import React, { useRef } from 'react';
import { type noteType } from '@/utils/types';
export type useMusicBoxButtonsType = {
  [key in noteType]: React.MutableRefObject<HTMLButtonElement | null>;
};
export default function useMusicBoxButtons() {
  const buttons: useMusicBoxButtonsType = {
    do: useRef<HTMLButtonElement | null>(null),
    re: useRef<HTMLButtonElement | null>(null),
    mi: useRef<HTMLButtonElement | null>(null),
    fa: useRef<HTMLButtonElement | null>(null),
    sol: useRef<HTMLButtonElement | null>(null),
    la: useRef<HTMLButtonElement | null>(null),
    si: useRef<HTMLButtonElement | null>(null),
    hDo: useRef<HTMLButtonElement | null>(null),
  };

  return buttons;
}
