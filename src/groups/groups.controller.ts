import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "../guards/auth.guard";


import { CreateGroupDto } from "./dto/createGroup.dto";
import { Group } from "./group.entity";
import { GroupsService } from "./groups.service";

@Controller('/groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get('all')
  async findAll(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @UseGuards(AuthGuard)  
  @Post()
  async createGroup(@Req() req: Request, @Body('group') createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(req.user, createGroupDto);
  }
}