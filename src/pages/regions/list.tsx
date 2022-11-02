import React from "react";
import {
    List,
    Table,
    useTable,
    Space,
    CreateButton,
    IResourceComponentsProps,
    EditButton,
} from "@pankod/refine";

import { IRegion } from "interfaces";
export const RegionList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IRegion>({
        initialSorter: [
            {
                field: "id",
                order: "asc"
            }
        ],
        metaData: {
            fields: [
                "id",
                "name"
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
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                />
                <Table.Column

                    key="name"
                    dataIndex="name"
                    title="name" />

                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: IRegion) => {
                        return (
                            <Space>
                                <EditButton recordItemId={record.id} />
                            </Space>
                        )
                    }}
                />
            </Table>
        </List >)
}