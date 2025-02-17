import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

interface TreeNode {
    key: string;
    label: string;
    children?: TreeNode[];
    parentKey?: string;
}

@Injectable()
export class NodesService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<TreeNode[]> {
        return this.prisma.treeNode.findMany({
            include: {
                children: true, // Include child nodes
            },
        });
    }

    async create(nodeData: TreeNode): Promise<TreeNode> {
        return this.prisma.treeNode.create({
            data: {
                key: nodeData.key,
                label: nodeData.label,
                parentKey: nodeData.parentKey,
            },
        });
    }

    async remove(id: string): Promise<void> {
        await this.prisma.treeNode.delete({
            where: { key: id },
        });
    }
}
