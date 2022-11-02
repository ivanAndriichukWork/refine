import {
    List,
    Table,
    useTable,
    Space,
    CreateButton,
    EditButton,
    IResourceComponentsProps,
} from "@pankod/refine";

import { ITax } from "interfaces";
export const TaxList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<ITax>({
        initialSorter: [{
            field: "ID",
            order: "asc"
        }],
        metaData: {
            fields: [
                "ID",
                "slug",
            ]
        }
    });
    return (
        <List
            pageHeaderProps={{
                extra: (<Space>
                    <CreateButton />
                </Space>)
            }}
        >
            <Table {...tableProps} rowKey="ID">
                <Table.Column
                    key="ID"
                    dataIndex="ID"
                    title="ID" />
                <Table.Column
                    key="slug"
                    dataIndex="slug"
                    title="Slug" />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record:ITax) => {
                        console.log(record.slug);
                        return (
                            <Space>
                                <EditButton recordItemId={record.ID}  />
                            </Space>
                        )
                    }}
                />
            </Table>
        </List>)
}