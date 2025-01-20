import Link from "next/link";

const NavLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      scroll={true}
      className="block py-2 pl-3 pr-4 text-black rounded-md md:p-0 transition-all duration-300 ease-in-out hover:text-white hover:bg-gray-800 hover:scale-105"
    >
      {title}
    </Link>
  );
};

export default NavLink;
