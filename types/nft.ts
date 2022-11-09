export type NFTMeta = {
    description: string;
    image: string;
    name: string;
    attributes: Attribute[];
}

export type Attribute = {
    trait_type: Trait;
    value: string;
}

export type Trait = "attack" | "health" | "speed";