import { Link } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { X } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="mt-8 dynamic-grid bg-[#16161d] gap-8 text-[#fafafa] px-[10%] py-10">
      <div>
        <h4 className="font-semibold mb-4">About us</h4>
        <ul className="text-xs">
          <li className="mb-2">
            <Link to="/about-us">About us</Link>
          </li>
          <li className="mb-2">
            <Link to="/careers">Careers</Link>
          </li>
          <li className="mb-2">
            <Link to="/contact-us">Contact us</Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Resources</h4>
        <ul className="text-xs">
          <li className="mb-2">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="mb-2">
            <Link to="/community">Community</Link>
          </li>
          <li className="mb-2">
            <Link to="/get-help">Get help</Link>
          </li>
          <li className="mb-2">
            <Link to="/privacy-policy">Privacy policy</Link>
          </li>
          <li className="mb-2">
            <Link to="/terms-of-use">Terms of use</Link>
          </li>
          <li>
            <Link to="/terms-and-conditions">Terms and conditions</Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Host events</h4>
        <ul className="text-xs">
          <li className="mb-2">
            <Link to="/pricing">Pricing</Link>
          </li>
          <li className="mb-2">
            <Link to="/get-app">Get app</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 items-center justify-between">
        <select
          className="w-full bg-transparent border border-[#fafafa] rounded-md px-3 py-1"
          name="language"
          id="language"
        >
          <option disabled>English</option>
          <option className="text-gray-600" value="french">
            French
          </option>
          <option className="text-gray-600" value="spanish">
            Spanish
          </option>
          <option className="text-gray-600" value="german">
            German
          </option>
        </select>

        <div className="flex items-center gap-4">
          <Link to="https://twitter.com">
            <X />
          </Link>
          <Link to="https://instagram.com">
            <InstagramIcon />
          </Link>
          <Link to="https://facebook.com">
            <FacebookIcon />
          </Link>
        </div>

        <p>&copy; Iventverse 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
