type NavLinksContents = {
  id: number;
  name: string;
  href: string;
};

const navLinks: NavLinksContents[] = [
  {
    id: 1,
    name: "features",
    href: "/features",
  },
  {
    id: 2,
    name: "security",
    href: "/security",
  },
  {
    id: 3,
    name: "about",
    href: "/about",
  },
];

export default navLinks;