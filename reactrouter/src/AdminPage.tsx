import * as React from 'react';
import { NavLink, Route, RouteComponentProps } from 'react-router-dom';

const AdminPage: React.SFC = () => {
  return (
    <div className="page-container">
      <h1>Admin Panel</h1>
      <ul className="admin-sections">
        <li className="users">
          <NavLink to={`/admin/users`} activeClassName="admin-link-active">
            Users
          </NavLink>
        </li>
        <li className="products">
          <NavLink to={`/admin/products`} activeClassName="admin-link-active">
            Products
          </NavLink>
        </li>
      </ul>
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/products" component={AdminProducts} />
    </div>
  );
};

// * PRODUCTS
interface IProduct {
  id: number;
  name: string;
  description: string;
}

const productList: IProduct[] = [
  {
    id: 1,
    name: 'Subscriptions',
    description: 'A list of available subscriptions',
  },
  { id: 2, name: 'Extensions', description: 'Custom extensions' },
  { id: 3, name: 'Courses', description: 'A list of courses' },
];

const AdminProducts: React.SFC = () => {
  return (
    <div>
      <ul className="admin-sections">
        {productList.map(product => (
          <li>
            <NavLink to={`/admin/products/${product.id}`}>
              <h4>{product.name}</h4>
            </NavLink>
          </li>
        ))}
      </ul>
      <Route path="/admin/products/:id" component={AdminProduct} />
    </div>
  );
};

const AdminProduct: React.SFC<RouteComponentProps<{ id: string }>> = props => {
  let product: IProduct;

  if (props.match.params.id) {
    const id: number = parseInt(props.match.params.id, 10);
    product = productList.filter(p => p.id === id)[0];
  } else {
    return null;
  }

  return <div>{product && <span>{product.description}</span>}</div>;
};

// * USERS
interface IUser {
  id: number;
  name: string;
  isAdmin: boolean;
}

const adminUsersData: IUser[] = [
  { id: 1, name: 'Fred', isAdmin: true },
  { id: 2, name: 'Bob', isAdmin: false },
  { id: 3, name: 'Jane', isAdmin: true },
];

const AdminUsers: React.SFC = () => {
  return (
    <div>
      <ul className="admin-sections">
        {adminUsersData.map(user => (
          <li>
            <NavLink
              to={`/admin/users/${user.id}`}
              activeClassName="admin-link-active"
            >
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <Route path="/admin/users/:id" component={AdminUser} />
    </div>
  );
};

const AdminUser: React.SFC<RouteComponentProps<{ id: string }>> = props => {
  let user: IUser;

  if (props.match.params.id) {
    const id: number = parseInt(props.match.params.id, 10);
    user = adminUsersData.filter(u => u.id === id)[0];
  } else {
    return null;
  }

  return (
    <div>
      <div>
        <b>Id: </b>
        <span>{user.id.toString()}</span>
      </div>
      <div>
        <b>Is Admin: </b>
        <span>{user.isAdmin.toString()}</span>
      </div>
    </div>
  );
};

export default AdminPage;
