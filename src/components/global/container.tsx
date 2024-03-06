import type { ReactNode, FC } from "react";
import PropTypes from "prop-types";

const Container: FC<Props> = async ({ children, className, bg }) => {
  return (
    <div className={bg || ""}>
      <div
        className={`container mx-auto min-h-full ${
          className || ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  // @ts-ignore
  bg: PropTypes.string,
};

export default Container;

type Props = {
  children: ReactNode;
  className?: string;
  bg?: `bg-${string}-${number}` | `bg-${string}`;
};
