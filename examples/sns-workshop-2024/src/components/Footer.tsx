import Image from "next/image";
import Link from "next/link";

export const Footer = () => (
  <footer className="row-start-2 flex flex-wrap items-center justify-center gap-2.5">
    <Link
      className="flex items-center gap-2.5 underline-offset-2 hover:underline"
      href="https://sns.id"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/logo.svg"
        alt="Sns logo"
        width={33}
        height={38}
        className="w-5"
      />
      sns.id
    </Link>
    |
    <Link
      className="underline-offset-2 hover:underline"
      href="https://sns.guide"
      target="_blank"
      rel="noopener noreferrer"
    >
      documentation
    </Link>
    |
    <Link
      className="underline-offset-2 hover:underline"
      href="https://github.com/Bonfida"
      target="_blank"
      rel="noopener noreferrer"
    >
      github
    </Link>
  </footer>
);
