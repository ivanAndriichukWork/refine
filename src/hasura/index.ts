import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import {
    CrudOperators,
    CrudFilters,
    CrudSorting,
    DataProvider,
} from "@pankod/refine";

export type HasuraSortingType = Record<string, "asc" | "desc">;

export type GenerateSortingType = {
    (sorting?: CrudSorting): HasuraSortingType | undefined;
};

export const generateSorting: GenerateSortingType = (sorting?: CrudSorting) => {
    if (!sorting) {
        return undefined;
    }

    const sortingQueryResult: Record<string, "asc" | "desc"> = {};

    sorting.forEach((sortItem) => {
        sortingQueryResult[sortItem.field] = sortItem.order;
    });

    return sortingQueryResult as HasuraSortingType;
};

export type HasuraFilterCondition =
    | "_and"
    | "_not"
    | "_or"
    | "_eq"
    | "_gt"
    | "_gte"
    | "_lt"
    | "_lte"
    | "_neq"
    | "_in"
    | "_nin"
    | "_like"
    | "_nlike"
    | "_ilike"
    | "_nilike"
    | "_is_null";

const hasuraFilters: Record<CrudOperators, HasuraFilterCondition> = {
    eq: "_eq",
    ne: "_neq",
    lt: "_lt",
    gt: "_gt",
    lte: "_lte",
    gte: "_gte",
    in: "_in",
    nin: "_nin",
    contains: "_ilike",
    ncontains: "_nilike",
    containss: "_like",
    ncontainss: "_nlike",
    null: "_is_null",
};

export const generateFilters: any = (filters?: CrudFilters) => {
    if (!filters) {
        return undefined;
    }

    const resultFilter: any = {};

    filters.forEach((filter) => {
        resultFilter[filter.field] = {};
        resultFilter[filter.field][hasuraFilters[filter.operator]] =
            filter.value;
    });

    return resultFilter;
};

const dataProvider = (client: GraphQLClient): DataProvider => {
    return {
        getOne: async ({ resource, id, metaData }) => {
            const operation = `${metaData?.operation ?? resource}_by_pk`;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    term_id: { value: id, type: "bigint", required: true },
                    ...metaData?.variables,
                },
                fields: metaData?.fields,
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        getMany: async ({ resource, ids, metaData }) => {
            const operation = metaData?.operation ?? resource;

            const { query, variables } = gql.query({
                operation,
                fields: metaData?.fields,
                variables: metaData?.variables ?? {
                    where: {
                        type: `${operation}_bool_exp`,
                        value: {
                            id: {
                                _in: ids,
                            },
                        },
                    },
                },
            });

            const result = await client.request(query, variables);

            return {
                data: result[operation],
            };
        },

        getList: async ({ resource, sort, filters, pagination, metaData }) => {
            const current = pagination?.current ?? 1;
            const limit = pagination?.pageSize || 10;
            const offset = (current - 1) * limit;

            const hasuraSorting = generateSorting(sort);
            const hasuraFilters = generateFilters(filters);

            const operation = metaData?.operation ?? resource;

            const aggreateOperation = `${operation}_aggregate`;

            const hasuraSortingType = `[${operation}_order_by!]`;
            const hasuraFiltersType = `${operation}_bool_exp`;

            const { query, variables } = gql.query([
                {
                    operation,
                    fields: metaData?.fields,
                    variables: {
                        limit,
                        offset,
                        ...(hasuraSorting && {
                            order_by: {
                                value: hasuraSorting,
                                type: hasuraSortingType,
                            },
                        }),
                        ...(hasuraSorting && {
                            where: {
                                value: hasuraFilters,
                                type: hasuraFiltersType,
                            },
                        }),
                    },
                },
                {
                    operation: aggreateOperation,
                    fields: [{ aggregate: ["count"] }],
                },
            ]);

            const result = await client.request(query, variables);

            return {
                data: result[operation],
                total: result[aggreateOperation].aggregate.count,
            };
        },

        create: async ({ resource, variables, metaData }) => {
            const operation = metaData?.operation ?? resource;

            const insertOperation = `insert_${operation}_one`;
            const insertType = `${operation}_insert_input`;
            console.log(metaData?.id);
            let id = 'id';
            if (metaData?.id) {
                id = metaData?.id;
            }
            const { query, variables: gqlVariables } = gql.mutation({
                operation: insertOperation,
                variables: {
                    object: {
                        type: insertType,
                        value: variables,
                        required: true,
                    },
                },
                fields: metaData?.fields ?? [id, ...Object.keys(variables)],
            });
            console.log(gqlVariables);
            console.log(query);
            const response = await client.request(query, gqlVariables);

            return {
                data: response[insertOperation],
            };
        },

        createMany: async ({ resource, variables, metaData }) => {
            const operation = metaData?.operation ?? resource;

            const insertOperation = `insert_${operation}`;
            const insertType = `[${operation}_insert_input!]`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation: insertOperation,
                variables: {
                    objects: {
                        type: insertType,
                        value: variables,
                        required: true,
                    },
                },
                fields: [
                    {
                        returning: metaData?.fields ?? ["term_id"],
                    },
                ],
            });

            const response = await client.request(query, gqlVariables);

            return {
                data: response[insertOperation]["returning"],
            };
        },

        update: async ({ resource, id, variables, metaData }) => {
            const operation = metaData?.operation ?? resource;

            const updateOperation = `update_${operation}_by_pk`;

            const pkColumnsType = `${operation}_pk_columns_input`;
            const setInputType = `${operation}_set_input`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation: updateOperation,
                variables: {
                    pk_columns: {
                        type: pkColumnsType,
                        value: {
                            id: id,
                        },
                        required: true,
                    },
                    _set: {
                        type: setInputType,
                        value: variables,
                        required: true,
                    },
                },
                fields: metaData?.fields ?? ["id"],
            });

            const response = await client.request(query, gqlVariables);

            return {
                data: response[updateOperation],
            };
        },
        updateMany: async ({ resource, ids, variables, metaData }) => {
            const operation = metaData?.operation ?? resource;

            const updateOperation = `update_${operation}`;

            const whereType = `${operation}_bool_exp`;
            const setInputType = `${operation}_set_input`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation: updateOperation,
                variables: {
                    where: {
                        type: whereType,
                        value: {
                            id: {
                                _in: ids,
                            },
                        },
                        required: true,
                    },
                    _set: {
                        type: setInputType,
                        value: variables,
                        required: true,
                    },
                },
                fields: [
                    {
                        returning: metaData?.fields ?? ["id"],
                    },
                ],
            });

            const response = await client.request(query, gqlVariables);

            return {
                data: response[updateOperation]["returning"],
            };
        },

        deleteOne: async ({ resource, id, metaData }) => {
            const operation = metaData?.operation ?? resource;

            const deleteOperation = `delete_${operation}_by_pk`;

            const { query, variables } = gql.mutation({
                operation: deleteOperation,
                variables: {
                    id: { value: id, type: "uuid", required: true },
                    ...metaData?.variables,
                },
                fields: metaData?.fields ?? ["id"],
            });

            const response = await client.request(query, variables);

            return {
                data: response[deleteOperation],
            };
        },

        deleteMany: async ({ resource, ids, metaData }) => {
            const operation = metaData?.operation ?? resource;

            const deleteOperation = `delete_${operation}`;

            const whereType = `${operation}_bool_exp`;

            const { query, variables } = gql.mutation({
                operation: deleteOperation,
                fields: [
                    {
                        returning: metaData?.fields ?? ["id"],
                    },
                ],
                variables: metaData?.variables ?? {
                    where: {
                        type: whereType,
                        required: true,
                        value: {
                            id: {
                                _in: ids,
                            },
                        },
                    },
                },
            });

            const result = await client.request(query, variables);

            return {
                data: result[deleteOperation]["returning"],
            };
        },

        getApiUrl: () => {
            throw new Error(
                "getApiUrl method is not implemented on refine-hasura data provider.",
            );
        },

        custom: async ({ url, method, headers, metaData }) => {
            let gqlClient = client;

            if (url) {
                gqlClient = new GraphQLClient(url, { headers });
            }

            if (metaData) {
                if (metaData.operation) {
                    if (method === "get") {
                        const { query, variables } = gql.query({
                            operation: metaData.operation,
                            fields: metaData.fields,
                            variables: metaData.variables,
                        });

                        const response = await gqlClient.request(
                            query,
                            variables,
                        );

                        return {
                            data: response[metaData.operation],
                        };
                    } else {
                        const { query, variables } = gql.mutation({
                            operation: metaData.operation,
                            fields: metaData.fields,
                            variables: metaData.variables,
                        });

                        const response = await gqlClient.request(
                            query,
                            variables,
                        );

                        return {
                            data: response[metaData.operation],
                        };
                    }
                } else {
                    throw Error("GraphQL operation name required.");
                }
            } else {
                throw Error(
                    "GraphQL need to operation, fields and variables values in metaData object.",
                );
            }
        },
    };
};

export default dataProvider;
