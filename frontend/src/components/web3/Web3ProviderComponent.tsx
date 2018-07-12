import * as React from "react";
import {connect, Dispatch} from "react-redux";

import {
    fetchAccountAction, 
    fetchAKTBalanceAction,
    fetchETHBalanceAction,
    fetchNetworkAction
} from "../../redux/actions/web3Action";
import {ApplicationStore} from "../../redux/store/store";
import {Web3AccountsStore} from "../../redux/store/web3AccountsStore";

export interface Props {
    web3Accounts: Web3AccountsStore;
}

export interface PropsFromDispatch {
    fetchAccount: () => void;
    fetchAKTBalance: (account: string) => void;
    fetchETHBalance: (account: string) => void;
    fetchNetwork: () => void;
}

interface AllProps extends Props, PropsFromDispatch {
}

const ONE_SECOND = 100000000000;
const POOLING_INTERVAL_IN_MS = ONE_SECOND;
const ETH_NETWORK_POOLING_INTERVAL_IN_MS = ONE_SECOND * 15;
let interval: any = null;
let networkInterval: any = null;

class Web3ProviderComponent extends React.Component<AllProps, {}> {

    constructor(props: any) {
        // @ts-ignore
        super(props);

        this.fetchBalances = this.fetchBalances.bind(this);
    }

    public componentDidMount() {
        this.props.fetchAccount();
        this.props.fetchNetwork();
        this.initPoll();
        this.initNetworkPoll();
    }

    public componentWillReceiveProps(nextProps: AllProps) {
        this.fetchBalances(nextProps.web3Accounts.accountSelected);

    }

    public componentWillUnmount() {
        clearInterval(interval);
        clearInterval(networkInterval);
    }

    public render() {
        return null;
    }

    private initPoll() {
        if (!interval) {
            interval = setInterval(this.props.fetchAccount, POOLING_INTERVAL_IN_MS);
        }
    }

    private initNetworkPoll() {
        if (!networkInterval) {
            networkInterval = setInterval(this.props.fetchNetwork, ETH_NETWORK_POOLING_INTERVAL_IN_MS);
        }
    }

    private fetchBalances(account: string) {
        this.props.fetchAKTBalance(account);
        this.props.fetchETHBalance(account);
    }
}

function mapStateToProps({web3Accounts}: ApplicationStore) {
    return {
        web3Accounts
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchAKTBalance: (account: string) => dispatch(fetchAKTBalanceAction(account)),
        fetchAccount: () => dispatch(fetchAccountAction()),
        fetchETHBalance: (account: string) => dispatch(fetchETHBalanceAction(account)),
        fetchNetwork: () => dispatch(fetchNetworkAction()),
    };
}

export default connect<{}, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Web3ProviderComponent);
