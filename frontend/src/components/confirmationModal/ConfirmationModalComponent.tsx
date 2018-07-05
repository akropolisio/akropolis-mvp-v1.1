import * as React from "react";
import { FormattedMessage } from "react-intl";

import "./c-confirmation-modal.css";

interface Props {
    isOpenProps: boolean;
    onClick: () => void;
}

export default class ConfirmationModalComponent extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        return (
            <div className={`c-confirmation-modal ${this.props.isOpenProps ? "c-confirmation-modal--show" : ""}`}>
                <div className="c-confirmation-modal__box">
                    <h1 className="c-confirmation-modal__headline"><FormattedMessage id="fundAccount.confirmContribution" /></h1>
                    <h3 className="c-confirmation-modal__introduction"><FormattedMessage id="fundAccount.youAreMakingACommitmentToContribute" /></h3>
                    <div className="c-confirmation-modal__wrapper-row">
                        <span className="c-confirmation-modal__wrapper-underline">
                            <span className="c-confirmation-modal__value">1</span><span className="c-confirmation-modal__unit">eth</span>
                        </span>
                        <span className="c-confirmation-modal__base-text c-confirmation-modal__base-text--lower-case">
                            <FormattedMessage id="fundAccount.every" />
                        </span>
                        <span className="c-confirmation-modal__wrapper-underline">
                            <span className="c-confirmation-modal__value">
                                <FormattedMessage id="fundAccount.month" />
                            </span>
                        </span>
                    </div>
                    <div className="c-confirmation-modal__wrapper-row">
                        <span className="c-confirmation-modal__base-text">
                            <FormattedMessage id="fundAccount.for" />
                        </span>
                    </div>
                    <div className="c-confirmation-modal__wrapper-row">
                        <span className="c-confirmation-modal__wrapper-underline">
                            <span className="c-confirmation-modal__value">3</span><span className="c-confirmation-modal__unit">
                                <FormattedMessage id="fundAccount.years" />
                            </span>
                        </span>
                    </div>
                    <div className="c-confirmation-modal__wrapper-row">
                        <span className="c-confirmation-modal__wrapper-description">
                            <span className="c-confirmation-modal__base-text">
                                <FormattedMessage id="fundAccount.theFirstContributionOf" />
                            </span>
                            <span className="c-confirmation-modal__value">1</span><span className="c-confirmation-modal__unit">eth</span>
                            <span className="c-confirmation-modal__base-text">
                                <FormattedMessage id="fundAccount.willBePaidImmediately" />
                            </span>
                        </span>
                    </div>
                    <FormattedMessage id="fundAccount.confirm">{
                        (confirm: string) =>
                            <button className="o-btn o-btn--wide c-confirmation-modal__btn">{confirm}</button>}
                    </FormattedMessage>
                    <FormattedMessage id="fundAccount.cancel">{
                        (cancel: string) =>
                            <button onClick={this.props.onClick} className="o-btn o-btn--reverse o-btn--wide c-confirmation-modal__btn">{cancel}</button>}
                    </FormattedMessage>
                </div>
            </div>
        );
    }
}