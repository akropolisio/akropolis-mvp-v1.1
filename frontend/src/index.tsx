import * as React from "react";
import * as ReactDOM from "react-dom";

import { addLocaleData, IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { HashRouter, Switch } from "react-router-dom";

import * as en from "react-intl/locale-data/en";

import LayoutWrapper from "./wrappers/LayoutWrapper";

import store from "./redux/store/store";

import "./style.css";

import messages from "./intl/messages";

const selectedLocale = "en";
addLocaleData([...en]);

ReactDOM.render(
    <IntlProvider locale={selectedLocale} messages={messages[selectedLocale]}>
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <LayoutWrapper/>
                </Switch>
            </HashRouter>
        </Provider>
    </IntlProvider>,
    document.getElementById("app") as HTMLElement,
);
