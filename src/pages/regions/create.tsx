import { Create, IResourceComponentsProps, useForm, Input, Form, Tabs, useTranslate } from "@pankod/refine";
import i18n from "i18n";
import { IRegion } from "interfaces";

export const RegionCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { formProps, saveButtonProps } = useForm<IRegion>({
        metaData: {
            fields: [
                "id"
            ],
        },
    });
    function callback(key: string) {
        console.log(key);
    }
    const ListItems = i18n.languages.map((language, k) =>
        <Tabs.TabPane tab={t("lang." + language)} key={k}>
            <Form.Item
                key={k}
                initialValue={k}
                label="language_id"
                name={["region_description", "data", k, "language_id"]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Name"
                name={["region_description", "data", k, "name"]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name={["region_description", "data", k, "description"]}
            >
                <Input />
            </Form.Item>
        </Tabs.TabPane>
    );
    const Demo = () => (
        <Tabs defaultActiveKey="1" onChange={callback}>
            {ListItems}
        </Tabs>
    );
    return (
        <Create saveButtonProps={saveButtonProps}>

            <Form {...formProps}>
                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Slug"
                    name="slug"
                >
                    <Input />
                </Form.Item>
                <Demo />
            </Form>

        </Create>
    )
}
