import type { FC } from "react";
import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Container from "./container";

const Header: FC<Props> = ({
  img,
  title,
  description,
  exploreLink,
  exploreContent = "Explore",
  reverse = false,
}) => {
  return (
    <Container bg="bg-base-200">
      <header className="hero h-screen bg-base-200">
        <div
          className={`hero-content lg:${
            reverse ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {img && (
            <Image
              className="max-w-sm rounded-lg shadow-2xl object-cover"
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              priority
            />
          )}
          <div>
            <h1 className="text-5xl font-bold">{title}</h1>
            {description && <p className="py-6">{description}</p>}
            {exploreLink && (
              <a className="btn btn-primary" href={exploreLink}>
                {exploreContent}
              </a>
            )}
          </div>
        </div>
      </header>
    </Container>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  exploreLink: PropTypes.string,
  exploreContent: PropTypes.string,
  description: PropTypes.string,
  // @ts-ignore
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    with: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  reserve: PropTypes.bool,
};

export default memo(Header);

type Props = {
  title: string;
  exploreLink?: string;
  exploreContent?: string;
  description?: string;
  img?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  reverse?: boolean;
};
