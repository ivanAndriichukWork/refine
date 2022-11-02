import React from "react";
import {
    Edit,
    Form,
    HttpError,
    Input,
    IResourceComponentsProps,
    useForm,
} from "@pankod/refine";

import { ITerm } from "interfaces";

export const RegionEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<
        ITerm,
        HttpError,
        ITerm
    >({
        resource: "terms",
        metaData: {
            operation: "terms",
            fields: [
                "term_id",
                "name",
                "slug",
                { "term_taxonomies": ["term_id", "parent"] },
            ],
        },
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"

            >
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
            </Form>
        </Edit>
    );
};
