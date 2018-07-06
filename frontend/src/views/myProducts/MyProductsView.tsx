import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import ProductRowComponent from "../../components/productRowComponent/ProductRowComponent";
import { Product } from "../../models/Products";

import { NAVIGATION } from "../../constants";

import "./v-products.css";

export interface Props {
    data: Product[];
    selectedProduct: Product | null;
}

export interface PropsFromDispatch {
    fetchProductsData: () => void;
    selectProduct: (product: Product) => void;
}

interface AllProps extends Props, PropsFromDispatch { }

interface State {
    idOfcheckedProduct: number | undefined;
}

export default class MyProductsView extends React.Component<AllProps, State> {

    public readonly state: State = {
        idOfcheckedProduct: undefined
    };

    constructor(props: any) {
        super(props);

        this.selectProduct = this.selectProduct.bind(this);
    }

    public componentWillMount() {
        this.props.fetchProductsData();
        if (this.props.selectedProduct && this.props.selectedProduct.id) {
            this.setState({
                ...this.state,
                idOfcheckedProduct: this.props.selectedProduct.id,
            });
        }
    }

    public render() {

        const listOfProducts = this.props.data.map((product: Product, index: number) => {
            return (
                <ProductRowComponent
                    productData={product} key={index}
                    onClickProduct={this.handleOnClickProduct}
                    idOfcheckedProduct={this.state.idOfcheckedProduct}
                />
            );
        });

        const initialContributionBtn = () => {
            if (!this.state.idOfcheckedProduct) {
                return null;
            }

            const checkedProduct: Product = this.props.data.filter((product: Product) => {
                return product.id === this.state.idOfcheckedProduct;
            })[0];

            if (!checkedProduct) {
                return null;
            }

            return (
                <>
                    <div className="v-products__wrapper-options"><FormattedMessage id="myProducts.upTo" />
                        <h1 className="v-products__value-of-options">{checkedProduct.fundPastReturns}% </h1>
                        <FormattedMessage id="myProducts.returns" />
                    </div>
                    <Link className="o-btn o-btn--block o-btn--wide" onClick={this.selectProduct} to={`/${NAVIGATION.fundAccount}`}>
                        <FormattedMessage id="myProducts.makeInitialContribution" />
                    </Link>
                </>
            );
        };

        return (
            <div className="v-products">
                <h1 className="v-products__headline"><FormattedMessage id="nav.myProducts" /></h1>
                {listOfProducts}
                {initialContributionBtn()}
            </div>
        );
    }

    private handleOnClickProduct = (id: number) => {
        this.setState({
            ...this.state,
            idOfcheckedProduct: id
        });
    }

    private selectProduct() {
        const product = this.props.data.filter((p: Product) => p.id === this.state.idOfcheckedProduct)[0];
        localStorage.setItem("product", JSON.stringify(product));
        this.props.selectProduct(product);
    }
}
