import * as React from 'react';
import { RouteComponentProps, Prompt } from 'react-router-dom';
import { IProduct, products } from './ProductsData';

type Props = RouteComponentProps<{ id: string }>;

interface IState {
  product?: IProduct;
  added: boolean;
}

class ProductPage extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      added: false,
    };
  }

  public componentDidMount() {
    const params = this.props.match.params.id
      ? parseInt(this.props.match.params.id, 10)
      : null;
    if (params) {
      const id: number = params;
      const product = products.filter(p => p.id === id)[0];
      this.setState({ product });
    }
  }

  public render() {
    const product = this.state.product;
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} />{' '}
        {product ? (
          <React.Fragment>
            {' '}
            <h1>{product.name}</h1> <p>{product.description}</p>{' '}
            <p className="product-price">
              {' '}
              {new Intl.NumberFormat('en-US', {
                currency: 'USD',
                style: 'currency',
              }).format(product.price)}{' '}
            </p>{' '}
            {!this.state.added && (
              <button onClick={this.handleAddClick}>Add to basket</button>
            )}{' '}
          </React.Fragment>
        ) : (
          <p>Product not found!</p>
        )}{' '}
      </div>
    );
  }

  private handleAddClick = () => {
    this.setState({ added: true });
  };

  private navAwayMessage = () =>
    'Are you sure you want to leave without adding this product to your basket?';
}

export default ProductPage;
