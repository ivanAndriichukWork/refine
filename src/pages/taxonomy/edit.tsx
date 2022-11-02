import React from "react";
import {
    Edit,
    Form,
    HttpError,
    Input,
    IResourceComponentsProps,
    useForm,
} from "@pankod/refine";

import { ITax } from "interfaces";

export const TaxEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<
        ITax,
        HttpError,
        ITax
    >({
        metaData: {
            operation: "taxonomy",
            fields: [
                "ID",
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
