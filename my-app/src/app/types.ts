type ModeType = '' | "generate" | "build";

type NodeInfo = {id: string, cost: number, used: boolean};
type AdjInfo = {target: string, weight: number, id: string}

export type {ModeType, NodeInfo, AdjInfo}


