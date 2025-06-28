import { Layout, Typography, Row, Col, Space } from "antd";
import { TwitterOutlined, InstagramOutlined, FacebookOutlined, MehOutlined } from "@ant-design/icons";

const FooterLayout = () => {
    const { Footer } = Layout;
    const { Text } = Typography;
    return (
        <Footer style={{ backgroundColor: "rgb(226, 236, 251)", borderTop: "1px solid #e8e8e8"}}>
            <div style={{ maxWidth: 1400 }}>
                <Row className="row-footer" style={{ display: "flex", justifyContent: "space-between", padding: "0 30px" }}>
                   
                    <Col md={8} xs={24} className="author">
                        <MehOutlined style={{ fontSize: "30px", marginRight: 10 }} />
                        <Text type="dark">Library management system © 2025 Created by Ngan Ha</Text>
                    </Col>

                   
                    <Col md={8} xs={24} className="icon-contact">
                        <Space size="middle">
                            <a className="text-body-secondary">
                                <TwitterOutlined/>
                            </a>
                            <a className="text-body-secondary">
                                <InstagramOutlined/>
                            </a>
                            <a className="text-body-secondary">
                                <FacebookOutlined/>
                            </a>
                        </Space>
                    </Col>
                </Row>
            </div>

        </Footer>
    );
};

export default FooterLayout;
