import Link from "next/link";

const Navigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
