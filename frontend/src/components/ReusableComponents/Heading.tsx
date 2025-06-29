import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-xl font-semibold capitalize'>{children}</p>;
};

export default Heading;
