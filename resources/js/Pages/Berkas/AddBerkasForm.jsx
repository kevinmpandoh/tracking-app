import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { router, usePage } from "@inertiajs/react";

const AddUserForm = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const { errors } = usePage().props;

    const handleSubmit = (values) => {
        router.post("/kelola-berkas", values);
        form.resetFields();
        onCancel();
    };

    console.log("Error", errors);

    return (
        <Modal
            title="Tambah Berkas"
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            width={600}
        >
            <Form
                form={form}
                name="control-hooks"
                onFinish={handleSubmit}
                style={{ maxWidth: 600 }}
                layout="vertical"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                size="large"
            >
                <Form.Item
                    name="document_number"
                    label="Nomor Berkas"
                    rules={[
                        {
                            required: true,
                            message: "Nomor dokumen tidak boleh kosong.",
                        },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Nama Berkas"
                    rules={[
                        {
                            required: true,
                            message: "Nama Berkas tidak boleh kosong.",
                        },
                    ]}
                >
                    <Input className="border border-slate-400 rounded-md" />

                    {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                    )}
                </Form.Item>

                <Form.Item
                    name="jenis_dokumen"
                    label="Jenis Dokumen"
                    rules={[
                        {
                            required: true,
                            message: "Jenis Dokumen tidak boleh kosong.",
                        },
                    ]}
                >
                    <Select
                        placeholder="Pilih Jenis Dokumen"
                        className="border border-slate-400 rounded-md"
                    >
                        <Select.Option value="LS">LS</Select.Option>
                        <Select.Option value="TU">TU</Select.Option>
                        <Select.Option value="GU">GU</Select.Option>
                        <Select.Option value="UP">UP</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserForm;
