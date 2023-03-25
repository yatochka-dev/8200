import { useEffect, useState } from "react";

export type OrientationType = "portrait" | "landscape";

// landscape is default, like for computers
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>("landscape");

  useEffect(() => {
    const handleOrientation = () => {
      // if (window.innerWidth > window.innerHeight) {
      //     setOrientation("landscape");
      // } else {
      //     setOrientation("portrait");
      // }

      const raw = screen.orientation.type;

      if (raw.includes("landscape")) {
        setOrientation("landscape");
      } else {
        setOrientation("portrait");
      }
    };

    window.addEventListener("resize", handleOrientation);
    return () => window.removeEventListener("resize", handleOrientation);
  }, []);

  return orientation;
};
