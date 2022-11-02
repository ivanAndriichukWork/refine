import React from "react"
import { IResourceComponentsProps, Form, Input, useForm, Create } from "@pankod/refine"
import { IColor } from "interfaces";

export const ColorCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IColor>()
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[
                        {
                            required: true,
                        },
                    ]}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Hex"
                    name="hex"
                    rules={[
                        {
                            required: true,
                        },
                    ]}

                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>

    )
}