import * as React from 'react';
import { IProduct, products } from './ProductsData';
import { Link, RouteComponentProps } from 'react-router-dom';
import 'url-search-params-polyfill';

interface IState {
  products: IProduct[];
  search: string;
}

class ProductPages extends React.Component<RouteComponentProps, IState> {
  public static getDerivedStateFromProps(
    props: RouteComponentProps,
    state: IState
  ) {
    const searchParams = new URLSearchParams(props.location.search);
    const search = searchParams.get('search') || '';
    return {
      products: state.products,
      search,
    };
    console.log(searchParams, 'color: #fff');
  }

  public constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      products: [],
      search: '',
    };
  }

  public componentDidMount() {
    this.setState({ products });
  }

  public render() {
    return (
      <div className="page-container">
        <p>
          Welcome to React shop where you can get all the things to do stuff
        </p>
        <ul className="product-list">
          {this.state.products.map(product => {
            if (
              !this.state.search ||
              (this.state.search &&
                product.name
                  .toLowerCase()
                  .indexOf(this.state.search.toLowerCase()) > -1)
            ) {
              return (
                <li key={product.id} className="product-list-item">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default ProductPages;
