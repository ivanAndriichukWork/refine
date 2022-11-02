import React from "react"
import { IResourceComponentsProps, Form, Input, Edit } from "@pankod/refine"
import { useForm } from "@pankod/refine"
import { IColor } from "interfaces";

export const ColorEdit: React.FC<IResourceComponentsProps> = () => {

    const { form, saveButtonProps } = useForm<IColor>({ action: "edit", resource: "colors", metaData: { "id": "id" } })
    return (
        <Edit saveButtonProps={saveButtonProps}>
        <Form {...form}>
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
            ></Form.Item>
        </Form>
        </Edit>

    )
}