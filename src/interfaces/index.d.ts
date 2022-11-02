export interface IPost {
    id: string;
    name: string;
    description: string;
}
export interface ITax {
    ID: string;
    slug: string;
}
export interface ITerm {
    term_id: string;
    name: string;
    slug: string;
    term_taxonomies: ITermTax;
}
export interface ITermTax {
    term_taxonomy_id: string;
    term_id: string;
    taxonomy: string;
    description: string;
    parent: string;
    count: string;
    term: { name: string };
}
export interface RegionDescription {
    id: string;
    description: string;
    name: string;
    language_id: string;
    region_id: string;
}
export interface IRegion {
    id: string;
    name: string;
    slug: string;
    region_description: RegionDescription;
}

export interface IColor {
    id: string;
    hex: string;
    name: string;
    slug: string;
}

export interface IMake {
    id: string;
    name: string;
    slug: string;
}
export interface IModel {
    id: string;
    name: string;
    slug: string;
}

// mutation MyMutation { 
//   insert_terms(objects: {name: "mn1", slug: "mn1",term_group:1,
//   term_taxonomies:{data:{taxonomy:"region",parent:0, count:0, description:"description term"}}})
//   {returning{term_id}} 
// }

