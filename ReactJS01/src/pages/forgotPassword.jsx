import React, { useState } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi, resetPasswordApi } from "../util/api";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSendOtp = async (values) => {
        setLoading(true);
        try {
            const res = await forgotPasswordApi(values.email);
            if (res && res.EC === 0) {
                setEmail(values.email);
                setOtpSent(true);
                notification.success({
                    message: "Gửi OTP",
                    description: res.EM || "OTP đã được gửi tới email của bạn.",
                });
            } else {
                notification.error({
                    message: "Gửi OTP thất bại",
                    description: res?.EM || "Không thể gửi OTP.",
                });
            }
        } catch (error) {
            notification.error({
                message: "Gửi OTP thất bại",
                description: "Đã có lỗi xảy ra, vui lòng thử lại.",
            });
        } finally {
            setLoading(false);
        }
    };

    const onResetPassword = async (values) => {
        setLoading(true);
        try {
            const res = await resetPasswordApi(
                email,
                values.otp,
                values.newPassword,
            );
            if (res && res.EC === 0) {
                notification.success({
                    message: "Đặt lại mật khẩu",
                    description: res.EM || "Mật khẩu đã được cập nhật.",
                });
                navigate("/login");
            } else {
                notification.error({
                    message: "Cập nhật thất bại",
                    description: res?.EM || "Mã OTP hoặc email không hợp lệ.",
                });
            }
        } catch (error) {
            notification.error({
                message: "Cập nhật thất bại",
                description: "Đã có lỗi xảy ra, vui lòng thử lại.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset
                    style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    <legend>Quên mật khẩu</legend>
                    {!otpSent ? (
                        <Form
                            name="forgot-password"
                            onFinish={onSendOtp}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email!",
                                    },
                                    {
                                        type: "email",
                                        message: "Email không hợp lệ!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Gửi mã OTP
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Form
                            name="reset-password"
                            onFinish={onResetPassword}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item label="Email" name="email">
                                <Input value={email} disabled />
                            </Form.Item>
                            <Form.Item
                                label="OTP"
                                name="otp"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mã OTP!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu mới"
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mật khẩu mới!",
                                    },
                                    {
                                        min: 6,
                                        message:
                                            "Mật khẩu phải có ít nhất 6 ký tự.",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Cập nhật mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        <Link to="/login">
                            <ArrowLeftOutlined /> Quay lại Đăng nhập
                        </Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default ForgotPasswordPage;
