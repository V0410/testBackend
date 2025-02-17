import { Controller, Get, Post, Body, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { NodesService } from './nodes.service';

export interface TreeNode {
    key: string;           // Unique identifier for the node
    label: string;         // Display name of the node
    children?: TreeNode[]; // Optional array of child nodes
    parentKey?: string;    // Optional reference to the parent node's key
}

@Controller('nodes')
export class NodesController {
    constructor(private readonly nodesService: NodesService) { }

    @Get()
    async findAll(): Promise<TreeNode[]> {
        return this.nodesService.findAll();
    }

    @Post()
    async create(@Body() nodeData: TreeNode): Promise<TreeNode> {
        try {
            return await this.nodesService.create(nodeData);
        } catch (error) {
            throw new HttpException('Error creating node', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        try {
            await this.nodesService.remove(id);
            return { message: 'Node deleted successfully' };
        } catch (error) {
            throw new HttpException('Error deleting node', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
