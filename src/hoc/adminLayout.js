import React from "react";
import Sidebar from './../common/sidebar';

const adminLayout = (ChildComponent) => {
    class AdminLayout extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                pageLoaded: true,
                saveLeadClickEvent: ""
            };
        }

        renderHtml() {
            return <div className="d-flex" id="wrapper">
                {/* <!-- Sidebar--> */}
                <Sidebar />
                {/* <!-- Page content wrapper--> */}
                <div className="main" id="page-content-wrapper">
                    {/* <!-- Top navigation--> */}
                    {/* <Header /> */}
                    {/* <!-- Page content--> */}
                    <div className="container-fluid content-container">
                        <ChildComponent {...this.props} />
                    </div>
                </div>
            </div>
        }

        render() {
            return <>
                {this.renderHtml()}
            </>
        }
    }

    return AdminLayout;
}

export default adminLayout;