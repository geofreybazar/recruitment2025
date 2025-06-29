import { Link, useLocation } from "react-router";

const breadcrumbNameMap: Record<string, string> = {
  products: "Products",
  addproduct: "Add Product",
  updateproduct: "Update Product",
  updatecollection: "Update Collection",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const filteredPathnames = pathnames.filter(
    (segment, index) =>
      !(index === pathnames.length - 1 && /^[0-9a-fA-F]{24}$/.test(segment))
  );

  return (
    <nav className='text-sm text-gray-500 mb-4'>
      <ul className='flex space-x-1'>
        {filteredPathnames.map((value, index) => {
          const to = "/" + filteredPathnames.slice(0, index + 1).join("/");
          const isLast = index === filteredPathnames.length - 1;
          const label = breadcrumbNameMap[value] || value;

          return (
            <li key={to} className='flex items-center space-x-1'>
              <span>/</span>
              {isLast ? (
                <span className='text-gray-700 capitalize'>{label}</span>
              ) : (
                <Link
                  to={to}
                  className='text-blue-600 hover:underline capitalize'
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
