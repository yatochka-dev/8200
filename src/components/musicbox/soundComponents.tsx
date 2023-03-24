import {type useMusicBoxSoundsType} from "@/hooks/useMusicBoxSounds";
import {Portal} from "@mui/material";

export function SoundComponents({sounds}: { sounds: useMusicBoxSoundsType }) {
    return <Portal>
        <div id={"music-notes"}>
            <audio src="/notes/do.wav" ref={sounds.do}></audio>
            <audio src="/notes/re.wav" ref={sounds.re}></audio>
            <audio src="/notes/mi.wav" ref={sounds.mi}></audio>
            <audio src="/notes/fa.wav" ref={sounds.fa}></audio>
            <audio src="/notes/sol.wav" ref={sounds.sol}></audio>
            <audio src="/notes/la.wav" ref={sounds.la}></audio>
            <audio src="/notes/si.wav" ref={sounds.si}></audio>
            <audio src="/notes/high_do.wav" ref={sounds.hDo}></audio>
        </div>
    </Portal>;
}