import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsController } from './groups.controller';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports:[GroupsService]
})
export class GroupsModule {}
