import React from "react";

function Footer() {
  const footerItems = [
    "About",
    ,
    "Help Center",
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessibility",
    "Ads info",
    "Blog",
    "Status",
    "Careers",
    "Brand Resources",
    "Advertising",
    "Marketing",
    "X for Business",
    "Developers",
    "Directory",
    "Settings",
    "© 2023 Twitter Corp.",
  ];
  return (
    <div className="flex space-x-2 text-white overflow-hidden h-fit ">
      {footerItems.map((item) => {
        return (
          <p
            key={item}
            className="text-sm text-gray-600 hover:underline hover:cursor-pointer"
          >
            {item}
          </p>
        );
      })}
      {/* <h1>Footer</h1> */}
    </div>
  );
}

export default Footer;
//
