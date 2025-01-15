'use client'

import { TypeAnimation } from "react-type-animation";

const Animation = () => {
    return (
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'TZY',
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          'Badminton Group',
          1000,
/*           'Mobile Developer',
          1000,
          'UI/UX Designer',
          1000 */
        ]}
        wrapper="span"
        speed={50}
    
        repeat={Infinity}
      />
    );
  };

  export default Animation